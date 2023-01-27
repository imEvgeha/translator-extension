/* eslint-disable no-undef */
(() => {
    let lastVideoArray = [];
    setInterval(async () => {
        let isVideoDisplayed = false;
        await chrome?.storage?.local
            ?.get(["isVideoDisplayed"])
            ?.then((result) => {
                isVideoDisplayed = result?.isVideoDisplayed?.result;
            });

        const updatePopupData = (videoDataArray, updatedVideoDataArray) => {
            if (
                !isVideoDisplayed ||
                !isVideoIdInArraysEqual(videoDataArray, lastVideoArray)
            ) {
                chrome?.runtime?.sendMessage({
                    messageType: "UpdatePopupData",
                    data: updatedVideoDataArray?.length
                        ? updatedVideoDataArray
                        : videoDataArray,
                });
                lastVideoArray = videoDataArray;
            }
        };

        if (window.location.host === "www.facebook.com") {
            // Logic for Facebook
            const videoTags = document.querySelectorAll("video");
            const videosArray = videoTags.length ? [...videoTags] : [];

            const videoDataArray = videosArray.map((item, index) => {
                if (window.location.href?.includes(VIDEO_REF_PART_WATCH)) {
                    // Logic for video feed  (/watch?v=*ID*)
                    const mainItemParent = getThirteenthParentOfItem(item);
                    const postedDate = mainItemParent?.querySelector(
                        'span > a[tabindex="0"][aria-label]'
                    );
                    const videoNameWrapper = mainItemParent?.querySelector(
                        'div[class] > span[dir="auto"][class]'
                    );
                    const videoSpansList = mainItemParent?.querySelectorAll(
                        'div[class] > span[dir="auto"][class]'
                    );

                    const isItMainVideo =
                        mainItemParent?.children?.[0]?.innerText !== "";
                    const postTitle = isItMainVideo
                        ? videoNameWrapper?.innerText || UNNAMED_VIDEO
                        : videoSpansList?.[2]?.innerText || UNNAMED_VIDEO;

                    const videoRef = postedDate?.href;
                    const videoRefSplitted = isItMainVideo
                        ? videoRef?.split("/")
                        : videoRef.split("&");
                    const videoShortRef =
                        extractShortRefFromArray(videoRefSplitted);

                    if (isVideoIdValid(videoShortRef)) {
                        return {
                            videoName: cutLongName(postTitle),
                            videoRef: videoShortRef,
                            videoFrom: WEBSITE.FACEBOOK,
                        };
                    }
                } else if (
                    window.location.href?.includes(VIDEO_REF_PART_VIDEOS)
                ) {
                    // Logic for facebook video feed (*ID*/videos/*ID*)
                    const mainItemParent = getThirteenthParentOfItem(
                        getFifthParentOfItem(item)
                    );
                    const postedDate = mainItemParent?.querySelector(
                        'span > a[tabindex="0"][aria-label][role="link"] > span'
                    )?.parentElement;
                    const videoNameWrapper = mainItemParent?.querySelector(
                        'div[class] > span[dir="auto"][class] > span[class]'
                    );

                    const postTitle =
                        videoNameWrapper?.innerText || UNNAMED_VIDEO;
                    const videoRef = postedDate?.href;
                    const videoRefSplitted = videoRef?.includes(
                        VIDEO_REF_PART_VIDEOS
                    )
                        ? videoRef?.split("/")
                        : videoRef?.split("&");
                    const videoShortRef =
                        extractShortRefFromArray(videoRefSplitted);

                    if (isVideoIdValid(videoShortRef)) {
                        return {
                            videoName: cutLongName(postTitle),
                            videoRef: videoShortRef,
                            videoFrom: WEBSITE.FACEBOOK,
                        };
                    }
                } else if (
                    !window.location.href?.includes(VIDEO_REF_PART_WATCH) ||
                    !window.location.href?.includes(VIDEO_REF_PART_VIDEOS)
                ) {
                    // Logic for facebook feed & groups & profiles

                    const mainItemParent = getFifthParentOfItem(
                        getThirteenthParentOfItem(item)
                    );
                    const openFullScreenVideoLink =
                        mainItemParent?.querySelector(
                            'span > span > span > a[tabindex="0"][aria-label][role="link"] > i'
                        );
                    const videoNameWrapper = mainItemParent?.querySelector(
                        'div[style="text-align: start;"]'
                    );
                    const accountNameWrapper = mainItemParent?.querySelectorAll(
                        'div > a[role="link"][tabindex="0"] > span > span'
                    )?.[index];

                    const postTitle =
                        videoNameWrapper?.innerText ||
                        accountNameWrapper?.innerText ||
                        UNNAMED_VIDEO;
                    const videoRef =
                        openFullScreenVideoLink?.parentElement?.href;
                    const videoRefSplitted = videoRef?.includes("/videos/")
                        ? videoRef?.split("/")
                        : videoRef?.split("&");
                    const videoShortRef =
                        extractShortRefFromArray(videoRefSplitted);

                    if (isVideoIdValid(videoShortRef)) {
                        return {
                            videoName: cutLongName(postTitle),
                            videoRef: videoShortRef,
                            videoFrom: WEBSITE.FACEBOOK,
                        };
                    }
                }
                return {
                    videoName: undefined,
                    videoRef: undefined,
                    videoFrom: WEBSITE.FACEBOOK,
                };
            });

            updatePopupData(videoDataArray);

            // extract video from URL
            const splittedHref = window.location.href.split("/");
            const shortRefFromPageURL = extractShortRefFromArray(splittedHref);
            const doesVideoArrayContainsUrlId = videoDataArray.find(
                (element) => element.videoRef === shortRefFromPageURL
            );
            if (
                shortRefFromPageURL &&
                !doesVideoArrayContainsUrlId &&
                window.location.href?.includes(PAGE_REF_PART_WATCH)
            ) {
                videoDataArray.push({
                    videoName: undefined,
                    videoRef: shortRefFromPageURL,
                });
            }
        } else if (window.location.host === "twitter.com") {
            // logic for Twitter
            const videoTags = document.querySelectorAll("video");
            const videosArray = videoTags.length ? [...videoTags] : [];
            const videoDataArray = videosArray.map((item) => {
                const mainItemParent = getThirteenthParentOfItem(
                    getFifthParentOfItem(item)
                );
                const postedDate = mainItemParent?.querySelector(
                    'div > a[href][aria-label][role="link"] > time[datetime]'
                )?.parentElement;
                const videoRef = postedDate?.href;
                const shortRef = videoRef?.replace(/\D/g, "");
                const videoNameWrapper = mainItemParent?.querySelector(
                    'div[dir="auto"][data-testid="tweetText"][lang]'
                );
                const videoNameArray = [...videoNameWrapper?.children].map(
                    (item) => item.innerText
                );
                const postTitle = videoNameArray.length
                    ? videoNameArray.join(" ")
                    : UNNAMED_VIDEO;

                if (shortRef) {
                    return {
                        videoName: cutLongName(postTitle),
                        videoRef: shortRef,
                        videoFrom: WEBSITE.TWITTER,
                    };
                }

                return {
                    videoName: undefined,
                    videoRef: undefined,
                    videoFrom: WEBSITE.TWITTER,
                };
            });

            updatePopupData(videoDataArray);
        } else if (window.location.host === "www.instagram.com") {
            // logic for Instagram
            const articles = [...document.querySelectorAll("article")];
            const videoDataArray = articles?.map((article) => {
                const videosList = [...article?.querySelectorAll("video")];
                const profileWhoPosted = article.querySelector(
                    'div > div > span > a[href][role="link"][tabindex="0"]'
                );
                const profileName = profileWhoPosted.innerText;

                const videoData = videosList?.map((item) => {
                    if (item?.src?.includes("www.instagram.com")) {
                        const shortRefLink = [
                            ...article.querySelectorAll(
                                'section > div > div > div > a[href][role="link"][tabindex="0"] > div'
                            ),
                        ][0];

                        const videoRef = shortRefLink?.parentElement?.href;
                        const videoRefSplitted = videoRef?.split("/");
                        const videoShortRef =
                            videoRefSplitted?.[videoRefSplitted.length - 3];
                        const downloadVideoURL =
                            videoShortRef &&
                            `${URL_FOR_INSTAGRAM_VIDEO_DOWNLOADING}%22${videoShortRef}%22}`;
                        return {
                            videoName: cutLongName(profileName),
                            videoRef: downloadVideoURL,
                            isVideoReadyToDownloading: false,
                            videoFrom: WEBSITE.INSTAGRAM,
                        };
                    } else {
                        return {
                            videoName: cutLongName(profileName),
                            videoRef: item.src,
                            isVideoReadyToDownloading: true,
                            videoFrom: WEBSITE.INSTAGRAM,
                        };
                    }
                });
                return videoData;
            });
            const updatedVideoDataArray = videoDataArray.map((x) => ({
                videoName: x?.[0]?.videoName,
                videoRef: x?.[0]?.videoRef,
                isVideoReadyToDownloading: x?.[0]?.isVideoReadyToDownloading,
                videoFrom: x?.[0]?.videoFrom,
            }));

            updatePopupData(videoDataArray, updatedVideoDataArray);
        } else if (window.location.host === "www.dailymotion.com") {
            const videoRefSplitted = window.location?.pathname?.split("/");
            const dailyVideoId =
                videoRefSplitted?.[videoRefSplitted?.length - 1];
            const videoName = document.querySelector("#media-title")?.innerText;
            if (dailyVideoId) {
                fetch(
                    `https://www.dailymotion.com/player/metadata/video/${dailyVideoId}?embedder=`
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then(({ qualities }) => {
                        const linkToGetVideoInfo = qualities?.auto?.[0]?.url;
                        fetch(linkToGetVideoInfo)
                            .then((response) => {
                                return response.text();
                            })
                            .then((data) => {
                                const linkSplit = data.replace(
                                    /https:/g,
                                    " https:"
                                );
                                const linksArray = linkSplit.split(" ");
                                const linksPools = linksArray.filter((link) => {
                                    return (
                                        link !== "" && link.includes("https")
                                    );
                                });
                                const videoUrl = linksPools.length
                                    ? linksPools?.[0]
                                    : undefined;

                                const videoDataArray = [
                                    {
                                        videoName: cutLongName(videoName),
                                        videoRef: videoUrl,
                                        videoId: dailyVideoId,
                                        videoFrom: WEBSITE.DAILYMOTION,
                                    },
                                ];

                                updatePopupData(videoDataArray);
                            });
                    });
            }
        } else if (window.location.host === "vimeo.com") {
            const videoName = document.querySelector(
                "div > h1[class][format] > span"
            )?.innerText;
            const videoRefSplitted = window.location?.pathname?.split("/");
            const vimeoVideoId =
                videoRefSplitted?.[videoRefSplitted?.length - 1];
            const videoDataArray = [
                {
                    videoName: cutLongName(videoName),
                    videoRef: vimeoVideoId,
                    videoId: vimeoVideoId,
                    videoFrom: WEBSITE.VIMEO,
                },
            ];

            updatePopupData(videoDataArray);
        }

        // Logic to download video from mbasic favebook
        if (window.location.host === "mbasic.facebook.com") {
            let accessToDownload = false;
            let videoName = "unnamed_video";
            await chrome.storage.local
                .get(["isVideoDownloadingAllowed", "videoDownloadingName"])
                .then((result) => {
                    accessToDownload =
                        result?.isVideoDownloadingAllowed?.access;
                    videoName =
                        result?.videoDownloadingName?.name || "unnamed_video";
                });

            const links = [
                ...document.querySelectorAll("div[data-ft] > div > div > a"),
            ].map((item) => item?.href);
            links.length &&
                accessToDownload &&
                downloadItemByUrl(links[0], videoName, true);
        }
    }, 2000);
})();

chrome.runtime.onMessage.addListener((response) => {
    switch (response.messageType) {
        case "DownloadFacebookVideo":
            const handle = window.open(response.data, "_parent");
            handle.blur();
            chrome.storage.local.set({
                isVideoDownloadingAllowed: { access: true },
                videoDownloadingName: { name: response.name },
            });
            break;
        case "DownloadTwitterVideo":
            downloadTwitterVideo(response.data, response.name);
            break;
        case "DownloadInstagramVideo":
            if (response.isVideoReadyToDownloading) {
                downloadItemByUrl(response.data, response.name);
            } else {
                fetch(response.data)
                    .then((response) => {
                        return response.json();
                    })
                    .then(({ data }) => {
                        const videoInfo = data.shortcode_media;
                        downloadItemByUrl(videoInfo.video_url, response.name);
                    });
            }
            break;
        case "DownloadDailymotionVideo":
            downloadItemByUrl(response.data, response.name);
            break;
        case "DownloadVimeoVideo":
            downloadItemByUrl(response.data, response.name);
            break;
        default:
            console.log("Sorry, contentScript can't handle " + response + ".");
    }
});