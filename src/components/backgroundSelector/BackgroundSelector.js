import React, { useEffect, useState } from "react";
// import InputForSearch from "../inputForSearch/InputForSearch";
import { Image } from "primereact/image";
import "./BackgroundSelector.css";

export default function BackgroundSelector({ images }) {
    const [selectedImageId, setSelectedImageId] = useState(null);
    // const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        // eslint-disable-next-line no-undef
        chrome?.storage?.local?.get(["backgroundImage"]).then((result) => {
            if (result?.backgroundImage?.id) {
                setSelectedImageId(result?.backgroundImage?.id);
            }
        });
    }, []);

    const handleImageClick = (details) => {
        setSelectedImageId(details?.id);
        // eslint-disable-next-line no-undef
        chrome?.runtime?.sendMessage({
            messageType: "ChangeBackground",
            data: details,
        });
    };

    return (
        <div className="background_wrapper border-round-3xl">
            {/* <InputForSearch
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                disabled
            /> */}

            <div className="grid my-3">
                {images.map((imageDetails, index) => (
                    <div
                        key={imageDetails.id}
                        onClick={() => handleImageClick(imageDetails)}
                        className="col flex justify-content-center cursor-pointer px-1"
                    >
                        <Image
                            width="150"
                            height="138"
                            imageStyle={{ objectFit: "cover" }}
                            imageClassName={`border-round-3xl ${
                                selectedImageId === imageDetails.id &&
                                "border-primary border-3 shadow-5"
                            }`}
                            src={imageDetails.urls.regular}
                            alt={imageDetails.alt_description}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
