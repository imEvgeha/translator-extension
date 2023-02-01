import React, { useEffect, useState } from "react";
import "./Popup.css";
import exclamation_mark from "../../exclamation_mark.svg";
import question_mark from "../../question_mark.svg";
import logo from "../../logo.svg";
import { InputSwitch } from "primereact/inputswitch";

export default function Popup() {
    const [isDownloaderOn, setIsDownloaderOn] = useState();
    useEffect(() => {
        if (typeof isDownloaderOn === "boolean") {
            // eslint-disable-next-line no-undef
            chrome.storage.local.set({
                isDisplayDownloadButtonsAllowed: { access: isDownloaderOn },
            });
        }
    }, [isDownloaderOn]);

    useEffect(() => {
        checkAccess();
    }, []);

    const checkAccess = async () => {
        var accessToDisplayDownloadBtn;
        // eslint-disable-next-line no-undef
        await chrome.storage.local
            .get(["isDisplayDownloadButtonsAllowed"])
            .then((result) => {
                accessToDisplayDownloadBtn =
                    result?.isDisplayDownloadButtonsAllowed?.access;
            });
        setIsDownloaderOn(
            typeof accessToDisplayDownloadBtn === "undefined"
                ? true
                : accessToDisplayDownloadBtn
        );
    };

    return (
        <div className="main-container">
            <div className="flex align-items-center justify-content-between mb-4">
                <div>
                    <img src={logo} alt="Logo" />
                </div>
                <div className="mx-2 text-white text-xl">Video Downloader</div>
                <div>
                    <InputSwitch
                        checked={isDownloaderOn}
                        onChange={(e) => setIsDownloaderOn(e.value)}
                    />
                </div>
            </div>

            <div
                className={`flex justify-content-center align-items-center border-round-xl h-5rem px-3 ${
                    isDownloaderOn ? "custom-pink-bg" : "surface-700"
                }`}
            >
                <div>
                    {isDownloaderOn ? (
                        <img src={exclamation_mark} alt="Exclamation_mark" />
                    ) : (
                        <img src={question_mark} alt="Question mark" />
                    )}
                </div>

                <div className="ml-3 text-white text-xl">
                    {isDownloaderOn
                        ? "Download button added"
                        : "Add button to download videos on this site"}
                </div>
            </div>
        </div>
    );
}
