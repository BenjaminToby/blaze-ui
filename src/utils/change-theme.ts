export default function (theme: "default" | "dark" | "light") {
    switch (theme) {
        case "dark":
            window.document.documentElement.className = "dark";
            break;

        case "light":
            window.document.documentElement.className = "light";
            break;

        default:
            window.document.documentElement.className = "light";
            break;
    }
}
