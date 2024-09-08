import grabFinalProps from "@/utils/grabFinalProps";
import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    HTMLAttributes,
} from "react";

type Props = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    noMargin?: boolean;
};

export default function (props: Props) {
    const classNameText = (() => {
        let text = "";
        if (props.noMargin) text += " no-margin";
        if (props.className) text += " " + props.className;
        return text;
    })();

    const classNameFinal = classNameText?.match(/./)
        ? classNameText
        : undefined;

    const finalProps = grabFinalProps(props);

    switch (props.type) {
        case "h2":
            return (
                <h2 {...finalProps} className={classNameFinal}>
                    {props.children}
                </h2>
            );

        case "h3":
            return (
                <h3 {...props} className={classNameFinal}>
                    {props.children}
                </h3>
            );

        case "h4":
            return (
                <h4 {...props} className={classNameFinal}>
                    {props.children}
                </h4>
            );

        case "h5":
            return (
                <h5 {...props} className={classNameFinal}>
                    {props.children}
                </h5>
            );

        case "h6":
            return (
                <h6 {...props} className={classNameFinal}>
                    {props.children}
                </h6>
            );

        default:
            return (
                <h1 {...props} className={classNameFinal}>
                    {props.children}
                </h1>
            );
    }
}
