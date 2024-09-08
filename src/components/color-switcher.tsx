import React from "react";
import { changeTheme } from "../utils";

export default function () {
    const [mode, setMode] = React.useState<"dark" | "light" | "system" | null>(
        null
    );

    return (
        <div
            className={"theme-switch-wrapper" + (mode == "dark" ? " dark" : "")}
            onClick={(e) => {
                if (!mode || mode == "light") {
                    changeTheme("dark");
                    setMode("dark");
                } else if (mode == "dark") {
                    changeTheme("light");
                    setMode("light");
                }
            }}
        >
            <div className="theme-switcher-button"></div>
        </div>
    );
}
