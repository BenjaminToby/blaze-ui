import { DetailedHTMLProps, HTMLAttributes } from "react";
import { DefaultAttributes } from "@/types";
export default function (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & DefaultAttributes & {
    vertical?: boolean;
}): import("react").JSX.Element;
