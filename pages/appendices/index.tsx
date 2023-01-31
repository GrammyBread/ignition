import { GetStaticProps } from "next";
import * as React from "react";
import Layout from "../../src/components/Main/Layout";
import { CleanedNavigation } from "../../src/interfaces/read/cleaned-types.interface";
import NotFoundPage from "../../src/components/Error/NotFound";
import {
    Box,
    Divider,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import getCleanSiteData from "../../src/lib/api/sitedata/cache-site-data";
import { getAppendicesHome } from "../../src/lib/api/client";
import { AppendixHome } from "../../src/interfaces/appendices/home.interface";
import { useState } from "react";
import AppendixList, {
    AppendixListProps,
} from "../../src/components/Appendix/AppendixList/AppendixList";
import { Resource } from "../../src/interfaces/read/read-metadata.interfaces";
import { PublicBackground } from "../../public/backgroundImage";
import { AppendixHeader } from "../../src/components/Appendix/AppendixHeader/AppendixHeader";
import AppendixListMobile from "../../src/components/Appendix/AppendixList/AppendixListMobile";

interface Props {
    navData: CleanedNavigation;
    homeData: AppendixHome;
}

const AppendicesHome = (props: Props): JSX.Element => {
    const theme = useTheme();
    const [background, setBackground] = useState(PublicBackground);
    const isSmallScreen = useMediaQuery("(max-width: 1000px) and (orientation: portrait)");

    if (props == undefined || props.homeData == undefined) {
        return <NotFoundPage requestedItem={`Appendices`} />;
    }

    const functionSetBackground = (newImage?: Resource) => {
        if (newImage) {
            setBackground(newImage);
        } else {
            setBackground(PublicBackground);
        }
    };

    const appendixProps = {
        CharacterProps: {
            item: props.homeData.metadata.character_lookup,
            url: "/appendices/character-lookup",
        },
        StationProps: {
            item: props.homeData.metadata.station_lookup,
            url: "/appendices/station-lookup",
        },
        Documents: props.homeData.metadata.appendix_items,
        changeBackground: functionSetBackground,
    } as AppendixListProps;

    return (
        <Layout backgroundImageUrl={background} disableAllPadding>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    padding: isSmallScreen ?
                        `${theme.spacing(1)} ${theme.spacing(3)} 0 ${theme.spacing(3)}` :
                        `${theme.spacing(1)} 0 ${theme.spacing(3)} ${theme.spacing(3)}`,
                    position: "relative",
                    display: "flex",
                    flexFlow: "column",
                }}
            >
                <Box sx={{
                    marginRight: !isSmallScreen ? theme.spacing(3) : 0
                }}>
                    <AppendixHeader
                        title={props.homeData.title}
                        content={props.homeData.content}
                    />
                </Box>
                {isSmallScreen ? (
                    <AppendixListMobile {...appendixProps} />
                ) : (
                    <AppendixList {...appendixProps} />
                )}
            </Box>
        </Layout>
    );
};

export default AppendicesHome;

export const getStaticProps: GetStaticProps = async (context) => {
    const cleanSiteData = await getCleanSiteData();
    if (!cleanSiteData) {
        throw Error("Could not get site data!");
    }

    const appendixHome = await getAppendicesHome();

    return {
        props: {
            navData: cleanSiteData.getSimpleNav(),
            homeData: appendixHome,
        } as Props,
        revalidate: 10 * 24 * 60 * 60,
    };
};
