/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const getThirteenthParentOfItem = (item) => {
    return item.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.parentElement;
};

const isVideoIdValid = (string) => {
    return !isNaN(+string) && string.length >= 14;
};

const getOnlyNumbersFromString = (string) => {
    return string?.replace(/^\D+/g, "");
};

const extractShortRefFromArray = (array) => {
    if (typeof array === "object" && array.length) {
        const arrayWithIds = array
            ?.map((item) => getOnlyNumbersFromString(item))
            ?.filter((item) => {
                return isVideoIdValid(item);
            });
        return arrayWithIds.length ? arrayWithIds[arrayWithIds.length - 1] : [];
    }
};

const getFifthParentOfItem = (item) => {
    return item.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement;
};

const downloadItemByUrl = (url, name, isFacebook) => {
    fetch(`${url}`)
        .then((response) => {
            return response.blob();
        })
        .then((data) => {
            var a = document.createElement("a");
            a.setAttribute("href", window.URL.createObjectURL(data));
            a.setAttribute("download", name + VIDEO_FORMATE);
            a.click();
            a.remove();
        })
        .then(() => {
            if (isFacebook) {
                window.history.back();
            }
        })
        .finally(() => {
            chrome.storage.local.set({
                isVideoDownloadingAllowed: { access: false },
                isVideoDisplayed: { result: false },
            });
            chrome?.runtime?.sendMessage({
                messageType: "UpdateCurrentDownloadVideoId",
                data: null,
            });
        });
};

const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

const downloadTwitterVideo = (tweetId, videoName) => {
    const url =
        "https://api.twitter.com/1.1/statuses/show.json?include_profile_interstitial_type=1&include_blocking=1&" +
        "include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&skip_status=1" +
        "&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_reply_count=1" +
        "&tweet_mode=extended&trim_user=false&include_ext_media_color=true&id=" +
        tweetId;
    const headers = new Headers({
        "Content-Type": "application/json",
        Accept: "*/*",
        authorization:
            "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        "x-csrf-token": getCookie("ct0"),
    });
    fetch(url, {
        method: "GET",
        credentials: "include",
        headers: headers,
    })
        .then((response) => response.json())
        .then((json) => {
            const videoVariantsList =
                json.extended_entities?.media?.[0]?.video_info?.variants;
            const videoUrl =
                videoVariantsList?.[videoVariantsList?.length - 1]?.url;
            downloadItemByUrl(videoUrl, videoName);
        });
};

const cutLongName = (name) => {
    return name?.length > 72 ? name.slice(0, 72) + "..." : name;
};

function isVideoIdInArraysEqual(a1, a2) {
    return (
        JSON.stringify(a1.map((item) => item.videoId)) ===
        JSON.stringify(a2.map((item) => item.videoId))
    );
}
