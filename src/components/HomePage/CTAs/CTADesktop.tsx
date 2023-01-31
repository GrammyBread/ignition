import * as React from "react";
import { Stack, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { CtaAreaProps, MakeButtons } from "./shared";

export const CtaDesktopArea = ({ buttons }: CtaAreaProps) => {
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
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{
                    a: {
                        textDecoration: "none",
                    },
                }}
            >
                {ctaButtons?.loreBtn && ctaButtons.loreBtn}
                {ctaButtons?.readBtn && ctaButtons.readBtn}
                {ctaButtons?.patreonBtn && ctaButtons.patreonBtn}
            </Stack>
        </Container>
    );
};
