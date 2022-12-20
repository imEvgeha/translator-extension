/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const getImagesByAlt = (alt) => {
    var allImages = document.getElementsByTagName("img");
    var images = [];
    for (var i = 0, len = allImages.length; i < len; ++i) {
        if (allImages[i].alt === alt) {
            images.push(allImages[i]);
        }
    }
    return images;
};

let clockIntervalId;
const googleLogo = getImagesByAlt("Google")?.[0];
const googleLogoWrapper = googleLogo?.parentElement;
const getTime = () => {
    const date = new Date();
    const time = new Intl.DateTimeFormat("ru-Ru", {
        hour: "numeric",
        minute: "numeric",
    }).format(date);

    return time;
};

const turnClockOn = () => {
    if (googleLogoWrapper) {
        clockIntervalId = setInterval(
            () => (googleLogoWrapper.innerText = getTime()),
            1000
        );
        googleLogoWrapper.innerText = getTime();
        googleLogoWrapper.classList.add("main-clock");
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

const handleSuggestionClick = (e) => {
    if (e.target.tagName === "LI") return;
    if (e.target.tagName === "DIV") {
        if (e.target.role || e.target.parentElement.role) return;

        // click on div
        e.preventDefault();
        e.stopPropagation();

        const searchText =
            e.target.parentElement?.children?.[
                e.target.parentElement?.children.length >= 3 ? 1 : 0
            ]?.children?.[0]?.innerText;

        searchWithCustomSearchEngine(searchText);
    } else {
        // click on text
        e.preventDefault();
        e.stopPropagation();
        const searchText =
            e.target.parentElement?.parentElement.children?.[0]?.innerText;

        searchWithCustomSearchEngine(searchText);
    }
};

const getSuggestions = (googleForm) => {
    const googleSuggestionList = googleForm.querySelectorAll("li");
    return googleSuggestionList;
};

const handleSuggestionsAction = (googleForm) => {
    const googleSuggestionList = getSuggestions(googleForm);
    if (googleSuggestionList.length <= 1) {
        // we're using interval to catch each change of suggestion list
        setTimeout(() => handleSuggestionsAction(googleForm), 200);
        return;
    }
    googleSuggestionList.forEach((item) => {
        // first remove cuz we don't wanna add bunch of event listeners to one item
        item.removeEventListener("click", handleSuggestionClick, true);
        item.addEventListener("click", handleSuggestionClick, true);
    });
};

const getDefaultBackgroundImage = () => {
    fetch(
        `https://api.unsplash.com/photos/VqhhGDYG5rU?client_id=23jIvSwoOSjY3bNTrvWQ6DdR1MPTF8LwNVmBv3y7o-g`
    ).then((response) => {
        console.log(response, "responce");
        return response;
    });
};
