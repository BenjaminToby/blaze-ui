import { Button } from "@/components";

export default function ButtonSample() {
    return (
        <div>
            <h2>Button</h2>
            <Button
                onClick={(e) => {
                    console.log("Button Clicked ...");
                }}
            >
                Button
            </Button>
        </div>
    );
}
