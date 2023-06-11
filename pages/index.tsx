import * as React from "react";
import { useMediaQuery } from "@mui/material";
import { getFeaturedSection, getHome } from "../src/lib/api/client";
import { GetStaticProps } from "next";
import Layout from "../src/components/Main/Layout";
import NotFoundPage from "../src/components/Error/specialty/NotFound";
import getCleanSiteData from "../src/lib/api/sitedata/cache-site-data";
import { HomePage } from "../src/interfaces/static/home.interfaces";
import { PublicBackground } from "../public/backgroundImage";
import { Orientation } from "../src/components/ReaderPage/Books/Helpers/enums";
import { useState, useEffect } from "react";
import { PageViewDetails } from "../src/components/HomePage/DetailsSection/DetailsSection";
import { DesktopHome } from "../src/components/HomePage/DesktopHomePage";
import { MobileHome } from "../src/components/HomePage/MobileHomePage";
import { useTheme } from '@mui/material/styles';
import { CompletePageProps } from "./_app";
import { FeaturedSectionProps } from "../src/components/HomePage/FeaturedSection/FeaturedSection";

interface HomeProps extends CompletePageProps {
    pageData: HomePage;
    featuredSection: FeaturedSectionProps;
}

const Home = (props: HomeProps): JSX.Element => {
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

    if (!cleanSiteData) {
        throw Error("Could not get site data!");
    }
    
  let featuredSection: FeaturedSectionProps | null = null;
  const featuredSectionSlug = cleanSiteData.getNewestSectionSlug();
  if (featuredSectionSlug) {
    const featuredSectionDetails = await getFeaturedSection(featuredSectionSlug);
    featuredSection = cleanSiteData.makeFeaturedSection(featuredSectionDetails);
  }

    return {
        props: {
            navData: cleanSiteData.getCacheableVersion(),
            pageData: homeData,
            featuredSection: featuredSection
        } as HomeProps,
        revalidate: 120,
    };
};
