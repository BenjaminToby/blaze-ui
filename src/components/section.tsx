import { CSSProperties } from "react";
import { StackProps } from "./stack";
import grabFinalProps from "@/utils/grabFinalProps";
import generateStyle from "@/utils/generateStyles";

type Props = StackProps;

export default function (props: Props) {
    const finalProps = grabFinalProps(props);

    const styles: CSSProperties | undefined = generateStyle(props);

    return (
        <section {...finalProps} style={styles}>
            {props.children}
        </section>
    );
}
