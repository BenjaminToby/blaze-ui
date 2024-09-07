import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    variant?: "solid" | "outlined";
};

export type PropertyNumbervalue = string | number;

export type MarginsAndPaddingValues = {
    mt?: PropertyNumbervalue;
    mb?: PropertyNumbervalue;
    mx?: PropertyNumbervalue;
    my?: PropertyNumbervalue;
    pt?: PropertyNumbervalue;
    pb?: PropertyNumbervalue;
    py?: PropertyNumbervalue;
    px?: PropertyNumbervalue;
};

export type DefaultAttributes = MarginsAndPaddingValues & {
    gap?: PropertyNumbervalue;
    "gap-x"?: PropertyNumbervalue;
    "gap-y"?: PropertyNumbervalue;
};
