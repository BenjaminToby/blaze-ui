import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps } from "react";
type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    variant?: "solid" | "outlined" | "ghost";
    color?: "default" | "secondary" | "accent" | "gray" | "light";
};
export default function (props: Props): React.JSX.Element;
export {};
