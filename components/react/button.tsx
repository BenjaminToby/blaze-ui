import grabFinalProps from "@/utils/grabFinalProps";
import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    DetailedHTMLProps,
} from "react";

type Props = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> &
    DetailedHTMLProps<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    > & {
        variant?: "solid" | "outlined" | "ghost";
        color?: "default" | "secondary" | "accent" | "gray" | "light";
    };

export default function (props: Props) {
    const variantClass = (() => {
        if (props.variant == "outlined") return "outlined";
        if (props.variant == "ghost") return "ghost";
        return "";
    })();

    const colorClass = (() => {
        if (props.color == "secondary") return "secondary";
        if (props.color == "accent") return "accent";
        if (props.color == "gray") return "gray";
        if (props.color == "light") return "light";
        return "";
    })();

    const classNameText = (() => {
        let text = "";
        if (props.href) text += "button ";
        if (props.variant) text += variantClass;
        if (props.color) text += " " + colorClass;
        if (props.className) text += " " + props.className;
        return text;
    })();

    const classNameFinal = classNameText?.match(/./)
        ? classNameText
        : undefined;

    const finalProps = grabFinalProps(props);

    if (props.href) {
        return (
            <a {...finalProps} className={classNameFinal} href={props.href}>
                {props.children}
            </a>
        );
    }
    return (
        <button {...finalProps} className={classNameFinal}>
            {props.children}
        </button>
    );
}
