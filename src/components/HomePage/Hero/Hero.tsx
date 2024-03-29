import {
    Box,
    Paper
} from "@mui/material";
import { HomeMetadata } from "../../../interfaces/static/home.interfaces";
import Image from "next/image";
import Styles from "./Hero.module.scss";
import { CtaMobileArea } from "../CTAs/CTAMobile";
import { CtaDesktopArea } from "../CTAs/CTADesktop";
import { Orientation } from '../../ReaderPage/Books/Helpers/enums';

export interface PageViewDetails {
    orientation: Orientation;
    isSmallScreen: boolean;
}

interface HeroProps {
    details: HomeMetadata;
    setup: PageViewDetails;
}

export const HeroSection = ({
    details,
    setup
}: HeroProps): JSX.Element => {
    const hero = details.hero;
    const cta = details.call_to_actions;
    let imageUrl = setup.isSmallScreen
        ? hero.banner_portrait.imgix_url
        : hero.banner_portrait.url;

    return (
        <Box className={Styles.homeHero}>
            <Box className={Styles.textRegion}>
                <Paper
                    className={Styles.textBackground}
                    elevation={0}
                >
                </Paper>
                <Paper
                    className={Styles.textHolder}
                    elevation={0}
                >
                    <Box
                        className={Styles.text}
                        component={"div"}
                        dangerouslySetInnerHTML={{ __html: hero.text }}
                    />
                    {
                        setup.isSmallScreen ?
                            <CtaMobileArea buttons={cta.buttons} /> :
                            <CtaDesktopArea buttons={cta.buttons} />
                    }
                </Paper>
            </Box>
            <Image
                src={imageUrl}
                fill
                alt={"banner image"}
                className={Styles.image}
            />
        </Box>
    );
};