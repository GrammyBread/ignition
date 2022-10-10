import { GetStaticProps } from 'next';
import { getParts, getSiteData } from '../../src/lib/api/client';
import * as React from 'react';
import PartCard from '../../src/components/PartCard/PartCard';
import Layout from '../../src/components/Main/Layout';
import { CleanedNavigation } from '../../src/interfaces/read/cleaned-types.interface';
import { PartCardProps } from '../../src/components/PartCard/PartCard';
import NotFoundPage from '../../src/components/Error/NotFound';
import { Grid } from '@mui/material';
import getCleanSiteData from '../../src/lib/api/sitedata/cache-site-data';

interface Props {
  navData: CleanedNavigation;
  parts: PartCardProps[]
}

function MakePartCards(parts: PartCardProps[]): JSX.Element[] {
  return parts.map((part) =>
    <Grid key={part.key} item xs={12} sm={10} md={8} lg={7} xl={6} >
      <PartCard {...part}></PartCard>
    </Grid>
  );
}

const Parts = (props: Props): JSX.Element => {
  if (props == undefined || props.navData == undefined || props.parts == undefined) {
    return <NotFoundPage requestedItem={`Read Home`} />
  }

  const partCards = MakePartCards(props.parts);

  return (
    <Layout navData={props.navData} backgroundImageUrl={"/assets/SiteBack.svg"}>
      <Grid container
        spacing={8}
        direction="row"
        justifyContent="center"
        alignItems="flex-start">
        {partCards}
      </Grid>
    </Layout>
  );
};

export default Parts;

export const getStaticProps: GetStaticProps = async (context) => {
  const cleanSiteData = await getCleanSiteData();
  const partResults = await getParts();
  if (!cleanSiteData) {
    throw Error("Could not get site data!")
  }

  return {
    props: {
      navData: cleanSiteData.getSimpleNav(),
      parts: cleanSiteData.getPartsForDisplay(partResults)
    } as Props,
    revalidate: 120
  };
};