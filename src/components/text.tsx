import { DefaultAttributes } from "@/types";
import grabFinalProps from "@/utils/grabFinalProps";
import React, {
    AnchorHTMLAttributes,
    DetailedHTMLProps,
    HTMLAttributes,
} from "react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
    DetailedHTMLProps<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    > &
    DefaultAttributes & {
        type?: "span" | "paragraph" | "quote";
        size?: "xs" | "sm" | "md" | "base" | "lg" | "xl";
        noMargin?: boolean;
        italic?: boolean;
        bold?: boolean;
        span?: boolean;
        link?: boolean;
    };

export default function Text(props: Props) {
    const classNameText = (() => {
        let text = "";
        if (props.noMargin) text += " no-margin";
        if (props.size) text += " " + props.size;
        if (props.italic) text += " italic";
        if (props.bold) text += " bold";
        if (props.className) text += " " + props.className;
        return text.trim();
    })();

    const classNameFinal = classNameText?.match(/./)
        ? classNameText
        : undefined;

    const finalProps = grabFinalProps(props);

    if (props.link || props.href) {
        return (
            <a {...finalProps} className={classNameFinal}>
                {props.children}
            </a>
        );
    }

    if (props.type == "span" || props.span) {
        return (
            <span {...finalProps} className={classNameFinal}>
                {props.children}
            </span>
        );
    }

    if (props.type == "quote") {
        return (
            <div className="quote-block">
                <span {...finalProps} className={classNameFinal}>
                    {props.children}
                </span>
            </div>
        );
    }

    return (
        <p {...finalProps} className={classNameFinal}>
            {props.children}
        </p>
    );
}

export function Link(props: Props) {
    return (
        <Text link {...props}>
            {props.children}
        </Text>
    );
}

export function Span(props: Props) {
    return (
        <Text type="span" {...props}>
            {props.children}
        </Text>
    );
}
