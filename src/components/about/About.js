import React from "react";
import "./About.css";
import {
    FIRST_DESCRIPTION,
    NAME,
    POWERED,
    RIGHT,
    SECOND_DESCRIPTION,
    TITLE,
} from "./constants";

export default function About() {
    return (
        <div className="text-white h-full ">
            <div className="about-wrapper mt-3 py-3 border-round-3xl flex flex-column align-items-center justify-content-between">
                <span className="text-6xl">{NAME}</span>
                <div className="text-center py-6 mb-8">
                    <div className="mb-4">
                        <span className="text-lg">{TITLE}</span>
                    </div>
                    <div className="mb-4">
                        <span>{FIRST_DESCRIPTION}</span>
                    </div>
                    <div>
                        <span>{SECOND_DESCRIPTION}</span>
                    </div>
                </div>
            </div>
            <div className="mb-4 flex-column flex align-items-center w-full absolute bottom-0 left-0">
                <div className="mt-8 mb-3 flex justify-content-center">
                    <a
                        href="https://creattab.com/privacy-policy"
                        className="mx-2 text-white about-link"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="https://creattab.com/terms-of-use"
                        className="mx-2 text-white about-link"
                    >
                        Terms of Use
                    </a>
                </div>
                <div className="mb-4 mt-6 font-bold">
                    <span>{NAME}</span>
                </div>

                <div className="flex justify-content-between w-full px-6">
                    <span>{RIGHT}</span>
                    <span>{POWERED}</span>
                </div>
            </div>
        </div>
    );
}
