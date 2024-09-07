import { StackProps } from "@/components/react/stack";

type Props = {
    defaultValue?: string;
    classString?: string;
};

export default function grabClassNames({ defaultValue, classString }: Props) {
    const classNameText = (() => {
        let text = defaultValue || "";
        if (classString) text += " " + classString;
        return text;
    })();

    const classNameFinal = classNameText?.match(/./)
        ? classNameText
        : undefined;

    return classNameFinal;
}
