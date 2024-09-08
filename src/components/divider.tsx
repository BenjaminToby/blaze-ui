import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import { DefaultAttributes } from "@/types";
import grabFinalProps from "@/utils/grabFinalProps";
import grabClassNames from "@/utils/grabClassNames";
import generateStyle from "@/utils/generateStyles";
export default function (
    props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
        DefaultAttributes & {
            vertical?: boolean;
        }
) {
    const finalProps = grabFinalProps(props);
    const classNameFinal = grabClassNames({
        classString: props.className,
        defaultValue: "divider" + (props.vertical ? " vertical" : ""),
    });

    const styles: CSSProperties | undefined = generateStyle(props);

    return <div {...finalProps} className={classNameFinal} style={styles} />;
}
