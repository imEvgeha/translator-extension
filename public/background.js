/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener((request) => {
    const handleError = (
        error = "Something went wrong, please try again later",
        item
    ) => {
        console.error(error, " on ", item);
    };

    const handleDownloadClick = async (item) => {
        const [tab] = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true,
        });
        if (item.videoFrom === "FACEBOOK") {
            await chrome.tabs.sendMessage(tab.id, {
                messageType: "DownloadFacebookVideo",
                data: `https://mbasic.facebook.com/watch/?v=${item.videoRef}`,
                name: item.videoName,
                ...item,
            });
        }
        if (item.videoFrom === "TWITTER") {
            await chrome.tabs.sendMessage(tab.id, {
                messageType: "DownloadTwitterVideo",
                data: item.videoRef,
                name: item.videoName,
                ...item,
            });
        }
        if (item.videoFrom === "INSTAGRAM") {
            await chrome.tabs.sendMessage(tab.id, {
                messageType: "DownloadInstagramVideo",
                data: item.videoRef,
                isVideoReadyToDownloading: item.isVideoReadyToDownloading,
                name: item.videoName,
                ...item,
            });
        }
        if (item.videoFrom === "DAILYMOTION") {
            await chrome.tabs.sendMessage(tab.id, {
                messageType: "DownloadDailymotionVideo",
                data: item.videoRef,
                name: item.videoName,
                ...item,
            });
        }
        if (item.videoFrom === "VIMEO") {
            fetch(
                `https://vimeo.com/${item.videoRef}?action=load_download_config`,
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                    },
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then(async ({ files, display_message }) => {
                    if (files?.length) {
                        const higherQualityVideo = files[files.length - 1];
                        const videoName = higherQualityVideo.base_file_name;
                        const videoUrl = higherQualityVideo.download_url;

                        await chrome.tabs.sendMessage(tab.id, {
                            messageType: "DownloadVimeoVideo",
                            data: videoUrl,
                            name: videoName,
                            ...item,
                        });
                    } else {
                        handleError(display_message, item);
                    }
                })
                .catch((error) => handleError(error, item));
        }
    };

    switch (request.messageType) {
        case "DownloadItemFromOtherPlace":
            handleDownloadClick(request.data);
            break;
        default:
            return;
    }
});
