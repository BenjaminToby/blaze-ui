import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    rel="stylesheet"
                    // href="https://fonts.googleapis.com/css?family=PT+Serif"
                    href="https://fonts.googleapis.com/css?family=Lora"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Inter"
                />
            </Head>
            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
