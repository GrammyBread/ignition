import { Box, Container, Grid, Paper, Stack, Theme } from "@mui/material";
import {
    DetailsSection,
    PageViewDetails,
} from "./DetailsSection/DetailsSection";
import Styles from "./HomePage.module.scss";
import { HomeMetadata } from "../../interfaces/static/home.interfaces";
import { CtaDesktopArea } from "./CTAs/CTADesktop";
import { HeroSection } from "./Hero/Hero";
import { CosmicSection } from "../../interfaces/read/read-metadata.interfaces";

export const DesktopHome = (
    data: HomeMetadata,
    pageSetup: PageViewDetails,
    featuredSection: CosmicSection
): JSX.Element => {
    return (
        <>
            <HeroSection details={data} setup={pageSetup} />
            <Stack direction={"row"} spacing={2}>
                <Box className={Styles.homeBody} maxWidth={"sm"}>
                    {data.body.sections.map((section) => (
                        <DetailsSection
                            key={section.alt_image}
                            section={section}
                            setup={pageSetup}
                        />
                    ))}
                </Box>
                <Stack direction={"column"} spacing={2}>
                    <Box
                        component={"div"}
                        dangerouslySetInnerHTML={{__html: data.instagram_feed}}
                        sx={{
                            background: "black",
                            width: "100px",
                            height: "100px",
                        }}
                     ></Box>
                    <Box
                        sx={{
                            background: "black",
                            width: "100px",
                            height: "100px",
                        }}
                    ></Box>
                </Stack>
            </Stack>
            <CtaDesktopArea buttons={data.call_to_actions.buttons} />
        </>
    );
};
