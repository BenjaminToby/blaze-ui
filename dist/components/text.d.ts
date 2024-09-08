import { DefaultAttributes } from "@/types";
import React, { AnchorHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";
type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & DefaultAttributes & {
    type?: "span" | "paragraph" | "quote";
    size?: "xs" | "sm" | "md" | "base" | "lg" | "xl";
    noMargin?: boolean;
    italic?: boolean;
    bold?: boolean;
    span?: boolean;
    link?: boolean;
};
export default function Text(props: Props): React.JSX.Element;
export declare function Link(props: Props): React.JSX.Element;
export declare function Span(props: Props): React.JSX.Element;
export {};
