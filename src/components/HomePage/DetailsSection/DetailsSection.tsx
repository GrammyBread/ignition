import { useState } from "react";
import {
    Box,
    Grow
} from "@mui/material";
import { HomeSection } from "../../../interfaces/static/home.interfaces";
import Image from "next/image";
import Styles from "../HomePage.module.scss";
import classNames from "classnames";
import { Orientation } from '../../ReaderPage/Books/Helpers/enums';

export interface PageViewDetails {
    orientation: Orientation;
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
    if (setup.orientation === Orientation.landscape) {
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
                    className={classNames(Styles.image, section.leftfloat ? Styles.right : Styles.left)}
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
            <div className={Styles.textHolder}>
                <Box
                    className={Styles.text}
                    component={"div"}
                    dangerouslySetInnerHTML={{ __html: section.text }}
                />
            </div>
        </Box>
    );
};