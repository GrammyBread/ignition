import * as React from "react";
import { useMediaQuery } from "@mui/material";
import { getHome } from "../src/lib/api/client";
import { GetStaticProps } from "next";
import Layout from "../src/components/Main/Layout";
import NotFoundPage from "../src/components/Error/NotFound";
import getCleanSiteData from "../src/lib/api/sitedata/cache-site-data";
import { HomePage } from "../src/interfaces/static/home.interfaces";
import { PublicBackground } from "../public/backgroundImage";
import { Orientation } from "../src/components/ReaderPage/Books/Helpers/enums";
import { useState, useEffect } from "react";
import { PageViewDetails } from "../src/components/HomePage/DetailsSection/DetailsSection";
import { DesktopHome } from "../src/components/HomePage/DesktopHomePage";
import { MobileHome } from "../src/components/HomePage/MobileHomePage";
import { GetFeaturedSection } from "../src/lib/api/shared";
import { CleanedNavigation } from "../src/interfaces/read/cleaned-types.interface";
import { useTheme } from '@mui/material/styles';
import { FeaturedScript, MakeFeaturedScript} from "../src/mappers/availability/nav-script.mappers";

interface Props {
    navData: CleanedNavigation;
    pageData: HomePage;
    featuredSection: FeaturedScript;
}

const Home = (props: Props): JSX.Element => {
    const [pageSetup, setPageSetup] = useState<PageViewDetails>({
        orientation: Orientation.portrait,
        isSmallScreen: true,
    } as PageViewDetails);
    const theme = useTheme();
    const isLandscapeMode = useMediaQuery("(orientation: landscape)");
    const isPortraitMode = useMediaQuery("(orientation: portrait)");
    const isSmallScreen = useMediaQuery("(max-width: 550px");
    const isLargeScreen = useMediaQuery("(min-width: 1001px)");

    useEffect(() => {
        setPageSetup({
            orientation: isPortraitMode
                ? Orientation.portrait
                : isLandscapeMode
                    ? Orientation.landscape
                    : Orientation.portrait,
            isSmallScreen,
        });
    }, [isLandscapeMode, isPortraitMode, isSmallScreen]);

    if (
        props.navData == undefined ||
        props.pageData == undefined ||
        props.pageData.metadata == undefined
    ) {
        return <NotFoundPage requestedItem="Home Page" />;
    }

    const data = props.pageData.metadata;

    return (
        <Layout backgroundImageUrl={PublicBackground} disableAllPadding={true}>
            {isLargeScreen
                ? DesktopHome(data, pageSetup, props.featuredSection, theme)
                : MobileHome(data, pageSetup)}
        </Layout>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
    const cleanSiteData = await getCleanSiteData();
    const homeData = await getHome();
    const featuredCosmicSection = await GetFeaturedSection();

    if (!cleanSiteData) {
        throw Error("Could not get site data!");
    }

    return {
        props: {
            navData: cleanSiteData.getSimpleNav(),
            pageData: homeData,
            featuredSection: featuredCosmicSection && MakeFeaturedScript(featuredCosmicSection, cleanSiteData)
        } as Props,
        revalidate: 120,
    };
};
