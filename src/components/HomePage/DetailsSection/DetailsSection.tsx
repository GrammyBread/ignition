import { useState } from "react";
import {
    Box,
    Grow,
    Paper
} from "@mui/material";
import { HomeSection } from "../../../interfaces/static/home.interfaces";
import { Orientiation } from "../../Appendix/ReaderPage/Books/Helpers/enums";
import Image from "next/image";
import Styles from "../HomePage.module.scss";

export interface PageViewDetails {
    orientation: Orientiation;
    isSmallScreen: boolean;
}

interface DetailsSectionProps {
    section: HomeSection;
    setup: PageViewDetails;
}

export const DetailsSection = ({
    section,
    setup,
}: DetailsSectionProps): JSX.Element => {
    const [showSubtext, setShowSubtext] = useState(false);
    let imageUrl: string;
    if (setup.orientation == Orientiation.landscape) {
        imageUrl = setup.isSmallScreen
            ? section.landscape_image.imgix_url
            : section.landscape_image.url;
    } else {
        imageUrl = setup.isSmallScreen
            ? section.portrait_image.imgix_url
            : section.portrait_image.url;
    }

    return (
        <Box className={Styles.bodySection}>
            <Box className={Styles.imageArea} onClick={() => setShowSubtext(!showSubtext)}>
                <Image
                    src={imageUrl}
                    fill
                    alt={section.alt_image}
                    className={Styles.image}
                />
                <Grow
                    in={showSubtext}
                    style={{ transformOrigin: "0 0 0" }}
                    {...(showSubtext ? { timeout: 1000 } : {})}
                >
                    <Box
                        className={Styles.subtext}
                        component={"div"}
                        dangerouslySetInnerHTML={{ __html: section.subtext }}
                    />
                </Grow>
            </Box>
            <Paper
                className={Styles.textHolder}
                elevation={7}
                sx={{
                    background: "black",
                }}
            >
                <Box
                    className={Styles.text}
                    component={"div"}
                    dangerouslySetInnerHTML={{ __html: section.text }}
                />
            </Paper>
        </Box>
    );
};