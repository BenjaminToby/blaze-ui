import React from "react";
import {
    Button,
    Container,
    Divider,
    Heading,
    Section,
    Stack,
    Row,
} from "@/components/react";

export default function ButtonSample() {
    return (
        <Section>
            <Container>
                <Stack gap={20}>
                    <Heading type="h2" noMargin>
                        Buttons
                    </Heading>
                    <Divider my={20} />
                    <Row>
                        <Button>Button</Button>
                        <Button color="secondary">Button Secondary</Button>
                        <Button color="accent">Button Accent</Button>
                        <Button color="gray">Button Gray</Button>
                        <Button color="light">Button Light</Button>
                    </Row>
                    <Row>
                        <Button variant="outlined">Button outlined</Button>
                        <Button variant="outlined" color="secondary">
                            Button outlined Secondary
                        </Button>
                        <Button variant="outlined" color="gray">
                            Button outlined Gray
                        </Button>
                        <Button variant="outlined" color="light">
                            Button outlined Light
                        </Button>
                    </Row>
                    <Button href="/" target="_blank">
                        Link Button
                    </Button>
                </Stack>
            </Container>
        </Section>
    );
}
