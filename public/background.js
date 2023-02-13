const generateTranslateButtons = (array = []) => {
    // eslint-disable-next-line no-undef
    chrome.contextMenus.removeAll();
    array?.forEach((item) => {
        // eslint-disable-next-line no-undef
        chrome.contextMenus.create({
            id: `${item?.code}`,
            title: `Translate "%s" to ${item?.language}`,
            contexts: ["selection"],
        });
    });
};

(async () => {
    // eslint-disable-next-line no-undef
    await chrome?.storage?.local?.get(["selectedLanguages"])?.then((result) => {
        const selectedLanguagesFromStorage = result?.selectedLanguages?.list;
        if (!selectedLanguagesFromStorage) return;
        generateTranslateButtons(selectedLanguagesFromStorage);
    });
})();

/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.messageType) {
        case "addVariant":
            generateTranslateButtons(request?.languages);
            break;
        default:
            console.log("Sorry, background can't handle " + request + ".");
    }
});

// eslint-disable-next-line no-undef
chrome.contextMenus.onClicked.addListener(function (clickData) {
    // eslint-disable-next-line no-undef
    chrome.tabs.create({
        url: `https://translate.google.com/?sl=auto&tl=${clickData.menuItemId}&text=${clickData.selectionText}&op=translate`,
    });
});
