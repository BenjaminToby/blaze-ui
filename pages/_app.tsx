import React from "react";
import type { AppProps } from "next/app";
import "@/blaze/styles/root.css";
import "@/blaze/styles/dist/less.css";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
