export default function grabValue(value: string | number) {
    if (typeof value == "string") return value;
    if (typeof value == "number") return value + "px";
    return String(value);
}
