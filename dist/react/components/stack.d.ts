import { DefaultAttributes } from "@/types";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & DefaultAttributes & {
    row?: boolean;
    center?: boolean;
};
export default function (props: Props): React.JSX.Element;
export declare function generateStyle(props: Props): React.CSSProperties | undefined;
export type StackProps = Props;
export {};
