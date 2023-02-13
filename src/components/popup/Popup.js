import React, { useEffect, useState } from "react";
import "./Popup.css";
import close_icon from "../../close_icon.svg";
import logo from "../../logo.svg";
import { LANGUAGES_LIST, MAX_SELECTED_LABELS } from "../../constants";
import { MultiSelect } from "primereact/multiselect";

export default function Popup() {
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    useEffect(() => {
        const icon = document.querySelector(".p-multiselect-trigger-icon");
        icon?.classList?.add("pi-plus");

        handleFirstData();
    }, []);

    const handleFirstData = async () => {
        // eslint-disable-next-line no-undef
        await chrome?.storage?.local
            ?.get(["selectedLanguages"])
            ?.then((result) => {
                const selectedLanguagesFromStorage =
                    result?.selectedLanguages?.list;
                if (!selectedLanguagesFromStorage) return;
                setSelectedLanguages(selectedLanguagesFromStorage);
                // eslint-disable-next-line no-undef
                chrome.runtime.sendMessage({
                    messageType: "addVariant",
                    languages: selectedLanguagesFromStorage,
                });
            });
    };

    const deleteItem = (item) => {
        const updatedArray = selectedLanguages.filter(
            (elem) => elem.code !== item.code
        );
        changeSelectedLanguages(updatedArray);
    };

    const changeSelectedLanguages = (array) => {
        if (array.length > MAX_SELECTED_LABELS) return;
        setSelectedLanguages(array);
        // eslint-disable-next-line no-undef
        chrome.storage.local.set({
            selectedLanguages: { list: array },
        });
        // eslint-disable-next-line no-undef
        chrome.runtime.sendMessage({
            messageType: "addVariant",
            languages: array,
        });
    };

    return (
        <div className="main-container">
            <div className="flex align-items-center justify-content-between mb-4">
                <div className="flex align-items-center">
                    <img src={logo} alt="Logo" />
                    <div className="mx-3 text-white text-3xl font-medium">
                        Click to Translate
                    </div>
                </div>
                <div className="flex align-items-center"></div>
            </div>

            <div
                className={`language-box flex align-items-center border-round-2xl flex-column p-5`}
            >
                {selectedLanguages.map((item) => {
                    return (
                        <div className={`flex align-items-center w-full mb-3`}>
                            <div
                                className="mr-3 text-white text-xl line-height-3
                                p-4 w-full custom-blue-bg border-round-2xl
                                font-medium language-min-size"
                            >
                                {item.language}
                            </div>
                            <div
                                className="p-4 custom-blue-bg border-round-2xl
                                text-xl line-height-3 cursor-pointer language-min-size
                                flex justify-content-center align-items-center"
                                onClick={() => deleteItem(item)}
                            >
                                <img src={close_icon} alt="close_icon" />
                            </div>
                        </div>
                    );
                })}
                <div
                    className="relative bg-white w-full border-round-2xl language-min-size
                    flex justify-content-center align-items-center"
                >
                    <div
                        className="absolute text-xl line-height-3
                            font-medium select-language-title language-min-size
                            flex justify-content-center align-items-center"
                    >
                        Select language
                    </div>
                    <MultiSelect
                        value={selectedLanguages}
                        onChange={(e) => changeSelectedLanguages(e.value)}
                        options={LANGUAGES_LIST}
                        optionLabel="language"
                        placeholder="Select Language"
                        maxSelectedLabels={MAX_SELECTED_LABELS}
                        filter
                    />
                </div>
            </div>
        </div>
    );
}
