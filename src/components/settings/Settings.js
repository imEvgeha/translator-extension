import React, { useEffect, useState } from "react";
import BackgroundSelector from "../backgroundSelector/BackgroundSelector";
import { CLIENT_ID /* MOCK_IMAGES */ } from "../backgroundSelector/constants";
import Bookmarks from "../bookmarks/Bookmarks";
import Clock from "../clock/Clock";
import SearchEngine from "../searchEngine/SearchEngine";
import "./Settings.css";

export default function Settings() {
    const [arrayOfBgImages, setArrayOfBgImages] = useState([]);
    const [isImagesLoading, setIsImagesLoading] = useState(false);

    useEffect(() => {
        getImages();
        // setArrayOfBgImages(MOCK_IMAGES);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getImages = () => {
        setIsImagesLoading(true);
        fetch(
            `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=16&orientation=landscape`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setArrayOfBgImages(data);
            })
            .finally(() => {
                setIsImagesLoading(false);
            });
    };

    return (
        <div className="border-round-3xl backgrounds-wrapper">
            <div>
                <div className="mb-2 pl-4 wrapper-title flex align-items-center">
                    Background
                    <i
                        onClick={() => getImages()}
                        className={`refresh-icon cursor-pointer ml-2 pi ${
                            isImagesLoading
                                ? "pi-spin pi-spinner"
                                : "pi-refresh"
                        }`}
                    />
                </div>
                <BackgroundSelector images={arrayOfBgImages} />
            </div>

            <div>
                <SearchEngine />
                <Clock />
            </div>

            <div className="mt-5 mb-3">
                {/* <div className="mt-5 mb-3 pl-4 wrapper-title">
                    Installed apps
                </div> */}

                <Bookmarks />
            </div>
        </div>
    );
}
