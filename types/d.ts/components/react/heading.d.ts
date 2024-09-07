import React, { DetailedHTMLProps, HTMLAttributes } from "react";
type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    noMargin?: boolean;
};
export default function (props: Props): React.JSX.Element;
export {};
