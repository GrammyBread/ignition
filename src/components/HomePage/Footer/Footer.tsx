import { Box, Paper, useTheme } from "@mui/material";
import { HomeMetadata } from "../../../interfaces/static/home.interfaces";
import Image from "next/image";
import Styles from "./Footer.module.scss";
import { CtaMobileArea } from "../CTAs/CTAMobile";
import { CtaDesktopArea } from "../CTAs/CTADesktop";
import { NavigationBackgroundColor } from "../../../styles/additional-colors";
import Link from "next/link";
import { Orientation } from '../../ReaderPage/Books/Helpers/enums';

export interface PageViewDetails {
    orientation: Orientation;
    isSmallScreen: boolean;
}

interface HeroProps {
    details: HomeMetadata;
    setup: PageViewDetails;
}

export const FooterSection = ({ details, setup }: HeroProps): JSX.Element => {
    const theme = useTheme();
    const hero = details.hero;
    const cta = details.call_to_actions;
    let imageUrl = setup.isSmallScreen
        ? hero.banner_landscape.imgix_url
        : hero.banner_landscape.url;

    return (
        <Box className={Styles.homeFooter}>
            <Box className={Styles.textRegion}>
                <Paper className={Styles.textBackground} elevation={0}></Paper>
                <Paper className={Styles.textHolder} elevation={0}>
                    {setup.isSmallScreen ? (
                        <CtaMobileArea buttons={cta.buttons} />
                    ) : (
                        <CtaDesktopArea buttons={cta.buttons} />
                    )}
                </Paper>
            </Box>
            <Image
                src={imageUrl}
                fill
                alt={"banner image"}
                className={Styles.image}
            />
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "fit-content",
                    borderTop: `solid 10px ${theme.palette.background.paper}`,
                    background: NavigationBackgroundColor(theme),
                    display: "flex",
                    flexFlow: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    zIndex: 100,
                    a: {
                        fontWeight: 700,
                        color: "white",
                    },
                }}
            >
                <Box
                    component="div"
                    dangerouslySetInnerHTML={{ __html: details.copyright }}
                    sx={{
                        display: "flex",
                        flex: "2",
                        flexFlow: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        a: {
                            fontWeight: 700,
                            color: "white",
                        },
                    }}
                />
                <Box sx={{
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    "img": {
                        display: "block !important",
                        transform: "scaleY(1) !important"
                    }
                }}>
                    <Link href={"/license"}>
                        <Image
                            alt="Creative Commons License"
                            src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png"
                            width={80}
                            height={15}
                        />
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};
