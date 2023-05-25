import { Box, Stack, Theme } from "@mui/material";
import {
    DetailsSection,
    PageViewDetails,
} from "./DetailsSection/DetailsSection";
import Styles from "./HomePage.module.scss";
import { HomeMetadata } from "../../interfaces/static/home.interfaces";
import { HeroSection } from "./Hero/Hero";
import { FeaturedScript } from "../../lib/availability/mappers/nav-script.mappers";
import FeaturedSection from "./FeaturedSection/FeaturedSection";
import { FooterSection } from "./Footer/Footer";

export const DesktopHome = (
    data: HomeMetadata,
    pageSetup: PageViewDetails,
    featuredSection: FeaturedScript,
    theme: Theme
): JSX.Element => {
    return (
        <>
            <HeroSection details={data} setup={pageSetup} />
            <Stack direction={"row"} spacing={2}>
                <Box className={Styles.homeBody}>
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
                            width: "fit-content",
                            height: "fit-content",
                            marginRight: theme.spacing(3),
                            marginTop: "5vh"
                        }}
                     ></Box>
                   {FeaturedSection(featuredSection, theme)}
                </Stack>
            </Stack>
            <FooterSection details={data} setup={pageSetup} />
        </>
    );
};
