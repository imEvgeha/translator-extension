import { Button } from "primereact/button";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import SettingsTabs from "./components/settingsTabs/SettingsTabs";

function App() {
    return (
        <div className="App">
            <Button
                onClick={() => {
                    // eslint-disable-next-line no-undef
                    chrome.runtime.sendMessage({ messageType: "ClosePopup" });
                }}
                className="p-button-close text-white surface-800 p-button-link shadow-none"
                icon="pi pi-times"
            />

            <SettingsTabs />
        </div>
    );
}
export default App;
