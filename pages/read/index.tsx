import { GetStaticProps } from "next";
import { getFeaturedSection, getParts } from "../../src/lib/api/client";
import * as React from "react";
import PartCard from "../../src/components/PartCard/PartCard";
import Layout from "../../src/components/Main/Layout";
import { PartCardProps } from "../../src/components/PartCard/PartCard";
import NotFoundPage from "../../src/components/Error/specialty/NotFound";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import getCleanSiteData from "../../src/lib/api/sitedata/cache-site-data";
import { PublicBackground } from "../../public/backgroundImage";
import { CompletePageProps } from "../_app";
import BadDataPage from "../../src/components/Error/specialty/BadData";
import { InvalidReadPartsLength } from "../../src/components/Error/error-ids.config";
import FeaturedSection, { FeaturedSectionProps } from "../../src/components/HomePage/FeaturedSection/FeaturedSection";

interface ReadProps extends CompletePageProps {
  parts: PartCardProps[];
  featuredSection: FeaturedSectionProps | null;
}

function MakePartCards(parts: PartCardProps[]): JSX.Element[] {
  return parts.map((part) => (
    <Grid key={part.key} item>
      <PartCard {...part}></PartCard>
    </Grid>
  ));
}

const Parts = (props: ReadProps): JSX.Element => {
  const theme = useTheme();
  const isLargerScreen = useMediaQuery(theme.breakpoints.up("sm"));

  if (!(props && props.navData && props.parts)) {
    return <NotFoundPage requestedItem={`Read Home`} />;
  }

  if (!props.parts.length) {
    return <BadDataPage id={InvalidReadPartsLength} />
  }

  const partCards = MakePartCards(props.parts);

  return (
    <Layout backgroundImageUrl={PublicBackground}>
      <Grid
        container
        spacing={4}
        direction="row">
        <Grid
          container
          item
          spacing={8}
          xs={12}
          sm={8}
          direction="column" >
          {partCards}
        </Grid>
        {isLargerScreen && 
          <Grid item xs={4}>
            {props.featuredSection &&
              <FeaturedSection {...props.featuredSection} />
            }
          </Grid>
        }
      </Grid>

    </Layout>
  );
};

export default Parts;

export const getStaticProps: GetStaticProps = async (context) => {
  const cleanSiteData = await getCleanSiteData();
  const partResults = await getParts();
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
      parts: cleanSiteData.getPartsForDisplay(partResults),
      featuredSection
    } as ReadProps,
    revalidate: 10 * 60 * 60,
  };
};
