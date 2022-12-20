/* eslint-disable no-undef */
let lastWindowId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.messageType) {
        case "OpenPopup":
            if (lastWindowId) chrome.windows.remove(lastWindowId, () => null);
            chrome.windows.create(
                {
                    url: "index.html",
                    type: "popup",
                    focused: true,
                    state: "fullscreen",
                },
                (info) => {
                    lastWindowId = info.id;
                }
            );
            break;
        case "ClosePopup":
            chrome.windows.remove(lastWindowId, () => null);
            break;
        case "ChangeBackground":
            (async () => {
                const [tab] = await chrome.tabs.query({
                    active: true,
                });

                chrome.storage.local.set({ backgroundImage: request?.data });
                chrome.tabs.sendMessage(tab.id, {
                    messageType: "ChangeBackground",
                    data: request?.data,
                });
            })();
            break;
        case "TurnClock":
            (async () => {
                chrome.storage.local.set({
                    clockData: { displayClock: request?.data },
                });
            })();
            break;
        case "ChangeSearchEngine":
            (async () => {
                const [tab] = await chrome.tabs.query({
                    active: true,
                });

                chrome.storage.local.set({
                    searchEngine: request?.data,
                });
                chrome.tabs.sendMessage(tab.id, {
                    messageType: "ChangeSearchEngine",
                    data: request?.data,
                });
            })();
            break;
        default:
            console.log("Sorry, background can't handle " + request + ".");
    }
});
