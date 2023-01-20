import { GetStaticProps } from "next";
import * as React from "react";
import Layout from "../../src/components/Main/Layout";
import { CleanedNavigation } from "../../src/interfaces/read/cleaned-types.interface";
import NotFoundPage from "../../src/components/Error/NotFound";
import { Box, Divider, Paper, Typography } from "@mui/material";
import getCleanSiteData from "../../src/lib/api/sitedata/cache-site-data";
import { getAppendicesHome } from "../../src/lib/api/client";
import { AppendixHome } from "../../src/interfaces/appendices/home.interface";
import { useState } from "react";
import AppendixList, {
    AppendixListProps,
} from "../../src/components/Appendix/AppendixList";
import { Resource } from "../../src/interfaces/read/read-metadata.interfaces";
import { PublicBackground } from "../../public/backgroundImage";

interface Props {
    navData: CleanedNavigation;
    homeData: AppendixHome;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const AppendicesHome = (props: Props): JSX.Element => {
    const [background, setBackground] = useState(PublicBackground);

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
        <Layout backgroundImageUrl={background}>
            <Paper
                sx={{
                    padding: "1rem",
                    margin: "1rem 0",
                }}
            >
                <Typography
                    gutterBottom
                    variant="h2"
                    component="h1"
                    textAlign={"center"}
                    sx={{
                        lineHeight: "1",
                    }}
                >
                    {props.homeData.title}
                </Typography>
                <Divider variant="middle" />
                <Typography
                    gutterBottom
                    variant="body1"
                    component="h2"
                    textAlign={"center"}
                    sx={{ margin: "1rem" }}
                >
                    <div dangerouslySetInnerHTML={{ __html: props.homeData.content }} />
                </Typography>
            </Paper>
            <Box
                sx={{
                    overflowX: "auto",
                }}
            >
                <AppendixList {...appendixProps} />
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
