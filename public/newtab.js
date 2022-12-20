/* eslint-disable no-undef */

const FOOTER_SCHEMA = [
    { title: "Terms of Use", url: "https://creattab.com/terms-of-use" },
    { title: "About", url: "https://creattab.com/about" },
    { title: "Privacy Policy", url: "https://creattab.com/privacy-policy" },
    { title: "Contact", url: "https://creattab.com/contact-us" },
];

const DEFAULT_IMAGE_URL =
    "https://images.unsplash.com/photo-1672137500670-833b22e3d841?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzODkwMTJ8MHwxfGFsbHx8fHx8fHx8fDE2NzIxMzc4OTE&ixlib=rb-4.0.3&q=80";

const BOOKMARKS_SCHEMA = [
    {
        url: "https://myaccount.google.com",
        name: "Account",
        logoPosition: "92",
    },
    {
        url: "https://maps.google.com",
        name: "Maps",
        logoPosition: "2085",
    },
    {
        url: "https://www.youtube.com",
        name: "Youtube",
        logoPosition: "275",
    },
    {
        url: "https://play.google.com",
        name: "Play",
        logoPosition: "1270",
    },
    {
        url: "https://news.google.com",
        name: "News",
        logoPosition: "910",
    },
    {
        url: "https://mail.google.com",
        name: "Mail",
        logoPosition: "2175",
    },
    {
        url: "https://meet.google.com",
        name: "Meet",
        logoPosition: "2538",
    },
    {
        url: "https://chat.google.com",
        name: "Chat",
        logoPosition: "1630",
    },
    {
        url: "https://contacts.google.com",
        name: "Contacts",
        logoPosition: "455",
    },
    {
        url: "https://drive.google.com",
        name: "Drive",
        logoPosition: "3260",
    },
];

const settingsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.33 9.78H20.3C20.0616 9.77859 19.8289 9.7066 19.6314 9.57313C19.4339 9.43965 19.2803 9.25066 19.19 9.03C19.19 9.02735 19.1889 9.0248 19.1871 9.02293C19.1852 9.02105 19.1827 9.02 19.18 9.02C19.091 8.80005 19.0683 8.55891 19.1144 8.32619C19.1606 8.09347 19.2738 7.8793 19.44 7.71L19.47 7.68C19.7822 7.36663 19.9574 6.94232 19.9574 6.5C19.9574 6.05768 19.7822 5.63337 19.47 5.32L18.68 4.54C18.3666 4.22783 17.9423 4.05256 17.5 4.05256C17.0577 4.05256 16.6334 4.22783 16.32 4.54L16.31 4.56C16.1368 4.72681 15.9187 4.83935 15.6824 4.88377C15.4461 4.92819 15.2019 4.90255 14.98 4.81C14.7563 4.72301 14.5641 4.57051 14.4285 4.37246C14.2928 4.1744 14.2202 3.94003 14.22 3.7V3.67C14.2208 3.45131 14.1785 3.23461 14.0954 3.0323C14.0124 2.82998 13.8903 2.64601 13.7362 2.49091C13.582 2.33581 13.3988 2.21262 13.1969 2.12838C12.9951 2.04415 12.7787 2.00052 12.56 2H11.44C11.2213 2.00052 11.0049 2.04415 10.8031 2.12838C10.6012 2.21262 10.418 2.33581 10.2638 2.49091C10.1097 2.64601 9.98758 2.82998 9.90456 3.0323C9.82154 3.23461 9.77921 3.45131 9.78 3.67V3.7C9.77952 3.93862 9.7079 4.17168 9.57431 4.3694C9.44072 4.56712 9.25121 4.72052 9.03 4.81C8.87906 4.87748 8.71533 4.91159 8.55 4.91C8.39227 4.91039 8.23601 4.87967 8.09016 4.81962C7.94431 4.75956 7.81173 4.67134 7.7 4.56L7.68 4.54C7.36663 4.22783 6.94232 4.05256 6.5 4.05256C6.05768 4.05256 5.63337 4.22783 5.32 4.54L4.53 5.32C4.21783 5.63337 4.04256 6.05768 4.04256 6.5C4.04256 6.94232 4.21783 7.36663 4.53 7.68L4.56 7.71C4.7276 7.88055 4.84125 8.09669 4.88675 8.33143C4.93226 8.56618 4.9076 8.80913 4.81586 9.02995C4.72412 9.25076 4.56936 9.43966 4.37091 9.57306C4.17246 9.70645 3.93911 9.77843 3.7 9.78H3.67C3.22733 9.78079 2.80302 9.95699 2.49001 10.27C2.17699 10.583 2.00079 11.0073 2 11.45V12.56C2.00079 13.0027 2.17699 13.427 2.49001 13.74C2.80302 14.053 3.22733 14.2292 3.67 14.23H3.7C3.93918 14.228 4.17332 14.2987 4.37151 14.4326C4.56969 14.5665 4.72259 14.7574 4.81 14.98C4.90064 15.2023 4.92527 15.4459 4.88092 15.6818C4.83658 15.9177 4.72516 16.1358 4.56 16.31L4.54 16.32C4.2277 16.6353 4.05251 17.0612 4.05251 17.505C4.05251 17.9488 4.2277 18.3747 4.54 18.69L5.32 19.47C5.63337 19.7822 6.05768 19.9574 6.5 19.9574C6.94232 19.9574 7.36663 19.7822 7.68 19.47L7.7 19.45C7.86699 19.2801 8.08127 19.1645 8.31492 19.1181C8.54858 19.0717 8.79079 19.0968 9.01 19.19C9.23543 19.2786 9.42921 19.4326 9.56643 19.6321C9.70364 19.8317 9.77802 20.0678 9.78 20.31V20.34C9.77947 20.5581 9.82205 20.7742 9.90529 20.9759C9.98852 21.1775 10.1108 21.3607 10.265 21.515C10.4193 21.6692 10.6025 21.7915 10.8041 21.8747C11.0058 21.9579 11.2219 22.0005 11.44 22H12.56C12.7781 22.0005 12.9942 21.9579 13.1959 21.8747C13.3975 21.7915 13.5807 21.6692 13.735 21.515C13.8892 21.3607 14.0115 21.1775 14.0947 20.9759C14.178 20.7742 14.2205 20.5581 14.22 20.34V20.31C14.222 20.0678 14.2964 19.8317 14.4336 19.6321C14.5708 19.4326 14.7646 19.2786 14.99 19.19C15.2092 19.0968 15.4514 19.0717 15.6851 19.1181C15.9187 19.1645 16.133 19.2801 16.3 19.45L16.32 19.47C16.6334 19.7822 17.0577 19.9574 17.5 19.9574C17.9423 19.9574 18.3666 19.7822 18.68 19.47L19.46 18.69C19.7723 18.3747 19.9475 17.9488 19.9475 17.505C19.9475 17.0612 19.7723 16.6353 19.46 16.32L19.44 16.31C19.2748 16.1358 19.1634 15.9177 19.1191 15.6818C19.0747 15.4459 19.0994 15.2023 19.19 14.98C19.2774 14.7574 19.4303 14.5665 19.6285 14.4326C19.8267 14.2987 20.0608 14.228 20.3 14.23H20.33C20.7727 14.2292 21.197 14.053 21.51 13.74C21.823 13.427 21.9992 13.0027 22 12.56V11.45C21.9992 11.0073 21.823 10.583 21.51 10.27C21.197 9.95699 20.7727 9.78079 20.33 9.78ZM12 15.5C11.3078 15.5 10.6311 15.2947 10.0555 14.9101C9.47993 14.5256 9.03133 13.9789 8.76642 13.3394C8.50151 12.6999 8.4322 11.9961 8.56725 11.3172C8.7023 10.6382 9.03564 10.0146 9.52513 9.52513C10.0146 9.03564 10.6382 8.7023 11.3172 8.56725C11.9961 8.4322 12.6999 8.50151 13.3394 8.76642C13.9789 9.03133 14.5256 9.47993 14.9101 10.0555C15.2947 10.6311 15.5 11.3078 15.5 12C15.5 12.9283 15.1313 13.8185 14.4749 14.4749C13.8185 15.1313 12.9283 15.5 12 15.5Z" border fill="#ffffff"/></svg>`;

let clockIntervalId;
const header = document.getElementById("header");

const clearInt = () => {
    clearInterval(clockIntervalId);
};

const getTime = () => {
    const date = new Date();
    const time = new Intl.DateTimeFormat("ru-Ru", {
        hour: "numeric",
        minute: "numeric",
    }).format(date);

    return time;
};

const turnClockOn = () => {
    if (header) {
        const timer = () => {
            header.innerText = getTime();
        };
        clockIntervalId = setInterval(timer, 1000);
        header.innerText = getTime();
    }
};

const searchWithCustomSearchEngine = (searchText) => {
    chrome?.storage?.local?.get(["searchEngine"]).then((engine) => {
        const searchEngine = engine?.searchEngine;
        if (searchEngine) {
            const url = `${searchEngine.searchUrl}${searchText}`;
            window.open(url).focus();
        }
    });
};

(() => {
    // CLOCK
    chrome.storage.local.get(["clockData"]).then((result) => {
        if (result?.clockData?.displayClock) {
            turnClockOn();
        } else {
            clearInterval(clockIntervalId);
            header.innerText = null;
        }
    });

    // CUSTOM SEARCH ENGINE
    const center = document.getElementById("center");
    const searchIcon = document.getElementById("searchIcon");
    const googleForm = center.querySelector(".search-box-wrapper");
    const googleInput = googleForm.querySelector("input");

    searchIcon.addEventListener("click", () => {
        searchWithCustomSearchEngine(googleInput.value);
        googleInput.value = "";
    });

    googleInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            searchWithCustomSearchEngine(e.target.value);
            e.target.value = "";
            return;
        }
    });

    // BOOKMARKS
    const footerElement = document.getElementById("footer");
    const customBookmarksWrapper = document.createElement("div");
    customBookmarksWrapper.classList.add("bookmarks-container-wrapper");
    const customBookmarks = document.createElement("div");
    customBookmarks.classList.add("bookmarks-container");
    BOOKMARKS_SCHEMA.forEach((bookmark, index) => {
        const bookmarkWrapper = document.createElement("div");
        bookmarkWrapper.style.backgroundPosition = `5px -${
            +bookmark.logoPosition + 3
        }px`;
        bookmarkWrapper.addEventListener("click", () =>
            window.open(bookmark.url).focus()
        );
        bookmarkWrapper.classList.add("bookmark-wrapper");
        const bookmarkTitle = document.createElement("span");
        bookmarkTitle.classList.add("bookmark-title");
        bookmarkTitle.innerText = bookmark.name;
        bookmarkWrapper.append(bookmarkTitle);
        customBookmarks.append(bookmarkWrapper);
    });
    customBookmarksWrapper.append(customBookmarks);
    footerElement.append(customBookmarksWrapper);

    // FOOTER BUTTONS
    const footerButtonsContainer = document.querySelector(".footer-buttons");
    const customFooter = document.createElement("div");
    customFooter.classList.add("footer-container");
    FOOTER_SCHEMA.forEach((item) => {
        const footerButton = document.createElement("a");
        footerButton.classList.add("footer-button");
        footerButton.innerText = item.title;
        footerButton.href = item.url;
        customFooter.append(footerButton);
    });
    footerButtonsContainer.append(customFooter);

    // SETTINGS BUTTON
    const settingsButton = document.createElement("button");
    settingsButton.classList.add("settings-button");
    settingsButton.innerHTML = settingsIcon;
    settingsButton.type = "button";
    settingsButton.setAttribute("data-modal", "#modal_1");
    settingsButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({ messageType: "OpenPopup" });
    });
    document.body.append(settingsButton);

    // BACKGROUND IMAGE FROM STORAGE
    chrome.storage.local.get(["backgroundImage"]).then((result) => {
        const urls = result?.backgroundImage?.urls;
        if (urls?.full) {
            document.body.style.backgroundImage = `url(${urls?.full})`;
        } else {
            document.body.style.backgroundImage = `url(${DEFAULT_IMAGE_URL})`;
        }
        document.body.style.backgroundSize = "cover";
    });
})();

chrome.runtime.onMessage.addListener((response) => {
    switch (response.messageType) {
        case "ChangeBackground":
            document.body.style.backgroundImage = `url(${response?.data?.urls?.full})`;
            document.body.style.backgroundSize = "cover";

            break;
        case "TurnClock":
            if (response.data) {
                turnClockOn();
            } else {
                clearInt();
                header.innerText = null;
            }
            break;
        default:
            console.log("Sorry, contentScript can't handle " + response + ".");
    }
});