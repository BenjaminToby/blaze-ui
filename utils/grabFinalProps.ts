import { StackProps } from "@/components/react/stack";

export default function grabFinalProps(props: { [key: string]: any }) {
    const finalProps = { ...props };
    delete finalProps["gap"];
    delete finalProps["gap-x"];
    delete finalProps["gap-y"];
    delete finalProps["mx"];
    delete finalProps["my"];
    delete finalProps["mt"];
    delete finalProps["mb"];
    delete finalProps["noMargin"];
    delete finalProps["variant"];
    delete finalProps["color"];
    delete finalProps["row"];

    return finalProps;
}
