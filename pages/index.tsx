import * as React from "react";
import {
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { getHome } from "../src/lib/api/client";
import { GetStaticProps } from "next";
import { CleanedNavigation } from "../src/interfaces/read/cleaned-types.interface";
import Layout from "../src/components/Main/Layout";
import NotFoundPage from "../src/components/Error/NotFound";
import getCleanSiteData from "../src/lib/api/sitedata/cache-site-data";
import {
    HomePage
} from "../src/interfaces/static/home.interfaces";
import { PublicBackground } from "../public/backgroundImage";
import { Orientiation } from "../src/components/Appendix/ReaderPage/Books/Helpers/enums";
import { useState, useEffect } from "react";
import { PageViewDetails } from "../src/components/HomePage/DetailsSection/DetailsSection";
import { DesktopHome } from "../src/components/HomePage/DesktopHomePage";
import { MobileHome } from '../src/components/HomePage/MobileHomePage';
import { GetFeaturedSection } from "../src/lib/api/shared";
import { CosmicSection } from "../src/interfaces/read/read-metadata.interfaces";

interface Props {
    navData: CleanedNavigation;
    pageData: HomePage;
    featuredSection: CosmicSection;
}

const Home = (props: Props): JSX.Element => {
    if (
        props.navData == undefined ||
        props.pageData == undefined ||
        props.pageData.metadata == undefined
    ) {
        return <NotFoundPage requestedItem="Home Page" />;
    }

    const [pageSetup, setPageSetup] = useState<PageViewDetails>({
        orientation: Orientiation.portrait,
        isSmallScreen: true,
    } as PageViewDetails);
    const isLandscapeMode = useMediaQuery("(orientation: landscape)");
    const isPortraitMode = useMediaQuery("(orientation: portrait)");
    const isSmallScreen = useMediaQuery("(max-width: 700px");
    const isLargeScreen = useMediaQuery("(min-width: 701px)");

    useEffect(() => {
        setPageSetup({
            orientation: isPortraitMode
                ? Orientiation.portrait
                : isLandscapeMode
                    ? Orientiation.landscape
                    : Orientiation.portrait,
            isSmallScreen,
        });
    }, [isLandscapeMode, isPortraitMode, isSmallScreen]);

    const data = props.pageData.metadata;


    return (
        <Layout
            navData={props.navData}
            backgroundImageUrl={PublicBackground}
            disableAllPadding={true}>
            {isLargeScreen ?
                DesktopHome(data, props.featuredSection, pageSetup)
                :
                MobileHome(data, pageSetup)
            }

        </Layout>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
    const cleanSiteData = await getCleanSiteData();
    const homeData = await getHome();
    const featuredSection = await GetFeaturedSection();

    if (!cleanSiteData) {
        throw Error("Could not get site data!");
    }

    return {
        props: {
            navData: cleanSiteData.getSimpleNav(),
            pageData: homeData,
            featuredSection
        } as Props,
        revalidate: 120,
    };
};
