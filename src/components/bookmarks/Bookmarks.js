import React from "react";
import "./Bookmarks.css";
import googleIcons from "../../icons/googleIcons.png";
import { BOOKMARKS_SCHEMA } from "./constants";
import { Button } from "primereact/button";

export default function Bookmarks() {
    return (
        <div className="bookmarks-wrapper mt-4 pt-3 px-5 border-round-3xl flex flex-column">
            <div className="flex justify-content-between align-items-center">
                <div className="bookmarks-header">
                    <i
                        className={`mr-3 pi pi-th-large`}
                        style={{ fontSize: "13px" }}
                    />
                    Apps
                </div>
                <div>
                    <Button
                        onClick={() =>
                            window
                                .open("https://about.google/products/")
                                .focus()
                        }
                        className="p-button-add-bookmarks text-white p-button-link shadow-none"
                        icon="pi pi-plus"
                    />
                </div>
            </div>
            <div className="grid my-3">
                {BOOKMARKS_SCHEMA.map((bookmark, index) => (
                    <div
                        key={index}
                        className="col flex justify-content-center"
                    >
                        <div
                            className="bg-white border-round-2xl p-1 h-4rem w-4rem cursor-pointer flex justify-content-center align-items-end"
                            style={{
                                backgroundImage: `url(${googleIcons})`,
                                backgroundSize: "55px 2714px",
                                backgroundPosition: `5px -${bookmark.logoPosition}px`,
                            }}
                            onClick={() => {
                                window.open(bookmark.url).focus();
                            }}
                        >
                            <span className="text-color text-sm">
                                {bookmark.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
