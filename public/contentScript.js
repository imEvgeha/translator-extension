/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener((response) => {
    switch (response.messageType) {
        case "Action":
            break;
        default:
            console.log("Sorry, contentScript can't handle " + response + ".");
    }
});
