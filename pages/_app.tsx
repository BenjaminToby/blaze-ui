import React from "react";
import type { AppProps } from "next/app";
import "@/styles/root.css";
import "@/styles/dist/less.css";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
