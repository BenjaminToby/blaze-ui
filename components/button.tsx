import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    variant?: "solid" | "outlined";
};

export default function (props: ButtonProps) {
    return <button {...props}></button>;
}
