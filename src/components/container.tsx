import { CSSProperties } from "react";
import { generateStyle, StackProps } from "./stack";
import grabFinalProps from "@/utils/grabFinalProps";
import grabClassNames from "@/utils/grabClassNames";

type Props = StackProps;

export default function (props: Props) {
    const finalProps = grabFinalProps(props);

    const classNameFinal = grabClassNames({
        classString: props.className,
        defaultValue: "container",
    });

    const styles: CSSProperties | undefined = generateStyle(props);

    return (
        <div {...finalProps} className={classNameFinal} style={styles}>
            {props.children}
        </div>
    );
}
