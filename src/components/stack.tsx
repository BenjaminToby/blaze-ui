import {
    DefaultAttributes,
    MarginsAndPaddingValues,
    PropertyNumbervalue,
} from "@/types";
import grabClassNames from "@/utils/grabClassNames";
import grabFinalProps from "@/utils/grabFinalProps";
import grabValue from "@/utils/grabValue";
import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    CSSProperties,
    DetailedHTMLProps,
    HTMLAttributes,
} from "react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
    DefaultAttributes & {
        row?: boolean;
        center?: boolean;
    };

export default function (props: Props) {
    const classNameFinal = grabClassNames({
        classString: props.className,
        defaultValue: props.row ? "row" : "stack",
    });

    const styles: CSSProperties | undefined = generateStyle(props);

    const finalProps = grabFinalProps(props);

    return (
        <div {...finalProps} className={classNameFinal} style={styles}>
            {props.children}
        </div>
    );
}

export function generateStyle(props: Props) {
    const styles: CSSProperties = props.style ? { ...props.style } : {};

    if (props.gap) styles.gap = grabValue(props.gap);
    if (props["gap-x"]) styles.columnGap = grabValue(props["gap-x"]);
    if (props["gap-y"]) styles.rowGap = grabValue(props["gap-y"]);
    if (props["center"]) styles.alignItems = "center";
    if (props["mt"]) styles.marginTop = grabValue(props["mt"]);
    if (props["mb"]) styles.marginBottom = grabValue(props["mb"]);
    if (props["mx"]) {
        const marginXValue = grabValue(props["mx"]);
        styles.marginRight = marginXValue;
        styles.marginLeft = marginXValue;
    }
    if (props["my"]) {
        const marginYValue = grabValue(props["my"]);
        styles.marginTop = marginYValue;
        styles.marginBottom = marginYValue;
    }
    if (props["pt"]) styles.paddingTop = grabValue(props["pt"]);
    if (props["pb"]) styles.paddingBottom = grabValue(props["pb"]);
    if (props["px"]) {
        const paddingXValue = grabValue(props["px"]);
        styles.paddingRight = paddingXValue;
        styles.paddingLeft = paddingXValue;
    }
    if (props["py"]) {
        const paddingYValue = grabValue(props["py"]);
        styles.paddingTop = paddingYValue;
        styles.paddingBottom = paddingYValue;
    }

    if (!Object.keys(styles)?.[0]) return undefined;

    return styles;
}

export type StackProps = Props;
