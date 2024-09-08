import { CSSProperties } from "react";
import { StackProps } from "./stack";
import grabFinalProps from "@/utils/grabFinalProps";
import grabClassNames from "@/utils/grabClassNames";
import generateStyle from "@/utils/generateStyles";

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
