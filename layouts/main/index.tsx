import React from "react";
import Header from "./Header";

export default function MainLayout({ children }: any) {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    );
}
