import * as React from "react";
import { Stack, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { CtaAreaProps, MakeButtons } from "./shared";

export const CtaMobileArea = ({ buttons }: CtaAreaProps) => {
    const theme = useTheme();
    const ctaButtons = MakeButtons(buttons);

    return (
        <Container
            sx={{
                padding: theme.spacing(3),
                marginBottom: theme.spacing(3),
            }}
        >
            <Stack
                direction="column"
                spacing={2}
                alignItems="center"
                sx={{
                    a: {
                        textDecoration: "none",
                    },
                }}
            >
                {ctaButtons?.readBtn && ctaButtons.readBtn}
                <Stack direction="row" spacing={2}>
                    {ctaButtons?.loreBtn && ctaButtons.loreBtn}
                    {ctaButtons?.patreonBtn && ctaButtons.patreonBtn}
                </Stack>
            </Stack>
        </Container>
    );
};
