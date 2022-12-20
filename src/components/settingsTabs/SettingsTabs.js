import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Settings from "../settings/Settings";
import "./SettingsTabs.css";
import About from "../about/About";

export default function SettingsTabs() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div>
            <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
                className="surface-900 settings-tabs-viev h-full"
            >
                <TabPanel
                    className="mr-3"
                    leftIcon="pi pi-cog mr-2"
                    header="Setting"
                >
                    <Settings />
                </TabPanel>
                {/* <TabPanel
                    className="mr-3"
                    leftIcon="pi pi-th-large mr-2"
                    header="Apps"
                >
                    Content VI
                </TabPanel> */}
                <TabPanel
                    className="mr-3"
                    leftIcon="pi pi-info-circle mr-2"
                    header="About"
                >
                    <About />
                </TabPanel>
            </TabView>
        </div>
    );
}
