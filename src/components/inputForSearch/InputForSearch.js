import React from "react";
import { InputText } from "primereact/inputtext";
import "./InputForSearch.css";

export default function InputForSearch({
    searchValue,
    setSearchValue,
    disabled,
}) {
    return (
        <span className="p-input-icon-left w-full mb-2">
            <i className="pi pi-search search_icon" />
            <InputText
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="search_bar_input w-full"
                placeholder="Search picture"
                disabled={disabled}
            />
        </span>
    );
}
