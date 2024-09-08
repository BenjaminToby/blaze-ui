import {
    DefaultAttributes,
    MarginsAndPaddingValues,
    PropertyNumbervalue,
} from "@/types";
import generateStyle from "@/utils/generateStyles";
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

export type StackProps = Props;
