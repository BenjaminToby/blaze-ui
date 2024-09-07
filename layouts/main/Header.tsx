import { Container, Heading } from "@/components/react";
import React from "react";

export default function Header({ children }: any) {
    return (
        <header>
            <Container>
                <Heading>Blaze UI</Heading>
            </Container>
        </header>
    );
}
