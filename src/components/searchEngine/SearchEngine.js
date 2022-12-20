import React, { useEffect, useState } from "react";
import "./SearchEngine.css";
import { Dropdown } from "primereact/dropdown";
import { SEARCH_ENGINES } from "./constants";

export default function SearchEngine() {
    const [engine, setEngine] = useState(false);

    useEffect(() => {
        const defaultSearchEngine = SEARCH_ENGINES[0];

        // eslint-disable-next-line no-undef
        chrome?.storage?.local?.get(["searchEngine"]).then((result) => {
            const searchEngine = result?.searchEngine;
            if (searchEngine) {
                setEngine(searchEngine);
            } else {
                setEngine(defaultSearchEngine);
                // eslint-disable-next-line no-undef
                chrome?.storage?.local?.set({
                    searchEngine: defaultSearchEngine,
                });
            }
        });
    }, []);

    const handleChange = (e) => {
        setEngine(e.value);
        // eslint-disable-next-line no-undef
        chrome?.runtime?.sendMessage({
            messageType: "ChangeSearchEngine",
            data: e.value,
        });
    };

    return (
        <div className="search-engine-wrapper mt-5 py-3 pl-5 pr-3 border-round-3xl flex align-items-center justify-content-between">
            <div className="search-engine-title flex align-items-center text-white">
                <i
                    className={"mr-3 pi pi-search"}
                    style={{ fontSize: "13px" }}
                />
                SearchEngine
            </div>

            <div className="">
                <Dropdown
                    value={engine}
                    options={SEARCH_ENGINES}
                    optionLabel="name"
                    onChange={handleChange}
                    // placeholder="Select a City"
                />
            </div>
        </div>
    );
}
