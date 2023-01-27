/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import "./Popup.css";
import { Button } from "primereact/button";
import logo from "../../logo.svg";

export default function Popup() {
    const [videoData, setVideoData] = useState([]);
    const [videoErrors, setVideoErrors] = useState([]);
    const [currentDownloadVideoId, setCurrentDownloadVideoId] = useState(null);
    const videoDataForCount = videoData.filter((item) => item.videoRef);
    const loadedCount = videoDataForCount.length;

    useEffect(() => {
        if (!videoData?.length) {
            chrome.storage.local.set({
                isVideoDisplayed: { result: false },
            });
        }
    }, [videoData]);

    chrome.runtime.onMessage.addListener((request) => {
        switch (request.messageType) {
            case "UpdatePopupData":
                if (request.data.length) {
                    setVideoData(request?.data);
                    chrome.storage.local.set({
                        isVideoDisplayed: { result: true },
                    });
                }
                break;
            case "UpdateCurrentDownloadVideoId":
                setCurrentDownloadVideoId(request.data);
                break;
            default:
                return;
        }
    });

    const handleError = (
        error = "Something went wrong, please try again later",
        item
    ) => {
        chrome.storage.local.set({
            isVideoDisplayed: { result: false },
        });
        setCurrentDownloadVideoId(null);
        const errorDataArray = videoData.map((video) => {
            return video.videoRef === item.videoRef
                ? { error: error, videoRef: video.videoRef }
                : null;
        });
        setVideoErrors(errorDataArray);
    };

    const handleDownloadClick = async (item) => {
        setCurrentDownloadVideoId(item.videoRef);
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

    const isThereErrors = (item, returnError) => {
        if (item.error) {
            return true;
        } else {
            const isThereErrors = videoErrors.find(
                (elem) => elem.videoRef === item.videoRef
            );
            return returnError ? isThereErrors?.error : !!isThereErrors;
        }
    };

    return (
        <div className="main-container">
            <div className="text-4xl logo-wrapper">
                <span className="text-white">Video</span>
                <span className="text-gradient ml-1">Downloader</span>
            </div>

            <div>
                <div className="flex justify-content-between my-3">
                    <span className="text-white">{loadedCount} loaded</span>
                    <i className="pi pi-arrow-circle-down text-white" />
                </div>

                <div>
                    {videoData.length ? (
                        videoData.map((item) =>
                            item.videoRef === undefined ? null : (
                                <div className="wrapper mb-3">
                                    <div
                                        className={`flex justify-content-between align-items-center`}
                                    >
                                        <img src={logo} alt="Logo" />
                                        <div className="text-white max-w-8rem">
                                            <span className="text-white">
                                                {item.videoName ||
                                                    "Unnamed video."}
                                            </span>
                                        </div>
                                        <Button
                                            loading={
                                                currentDownloadVideoId ===
                                                item.videoRef
                                            }
                                            className="button-gradient"
                                            label={
                                                currentDownloadVideoId ===
                                                item.videoRef
                                                    ? ""
                                                    : "Download"
                                            }
                                            onClick={() =>
                                                handleDownloadClick(item)
                                            }
                                        />
                                    </div>
                                    {isThereErrors(item) ? (
                                        <div className="text-red-600 text-center mt-2">
                                            Error: {isThereErrors(item, true)}
                                        </div>
                                    ) : null}
                                </div>
                            )
                        )
                    ) : (
                        <div className="flex justify-content-center align-items-center text-white text-6xl h-20rem">
                            Video not found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
