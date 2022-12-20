import React, { useEffect, useState } from "react";
import "./Clock.css";
import { InputSwitch } from "primereact/inputswitch";

export default function Clock() {
    const [displayClock, setDisplayClock] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line no-undef
        chrome?.storage?.local?.get(["clockData"]).then((result) => {
            if (typeof result?.clockData?.displayClock === "boolean") {
                setDisplayClock(result?.clockData?.displayClock);
            }
        });
    }, []);

    const handleChange = (e) => {
        setDisplayClock(e.value);
        // eslint-disable-next-line no-undef
        chrome?.runtime?.sendMessage({
            messageType: "TurnClock",
            data: e.value,
        });
    };

    return (
        <div className="clock-wrapper mt-3 pl-5 pr-3 border-round-3xl flex align-items-center justify-content-between">
            <div className="clock-title flex align-items-center text-white">
                <i
                    className={"mr-3 pi pi-clock"}
                    style={{ fontSize: "13px" }}
                />
                Clock
            </div>

            <div className="input-switch-wrapper">
                <InputSwitch checked={displayClock} onChange={handleChange} />
            </div>
        </div>
    );
}
