import { GetStaticProps } from 'next';
import { CosmicPart } from '../../interfaces/read/read-metadata.interfaces';
import { getParts, getSiteData } from '../../lib/api/client';
import * as React from 'react';
import Image from 'next/image';
import Styles from '../../styles/shared.module.scss';
import PartCard from '../../components/PartCard/PartCard';
import Layout from '../../components/Main/Layout';
import MapSiteData from '../../mappers/nav.mapper';
import { CleanedNavigation } from '../../interfaces/read/cleaned-types.interface';
import { Part } from '../../interfaces/read/view-data.interfaces';
import { PartCardProps } from '../../components/PartCard/PartCard';
import { CustomErrorPage } from '../../components/Error/Error';
import NotFoundPage from '../../components/Error/NotFound';
import { useRouter } from 'next/router';
import { GetRequestedResource } from '../../lib/api/shared';
import { Grid } from '@mui/material';

interface Props {
  navData: CleanedNavigation;
  parts: CosmicPart[];
}

function MakePartCards(parts: Part[], cosmicParts: CosmicPart[]): JSX.Element[] {
  let elements = new Array<JSX.Element>();
  parts.map((part) => {
    let relatedCosmicPart = cosmicParts.find((cosmic) => {
      return cosmic.id == part.id
    });

    if (relatedCosmicPart != undefined && relatedCosmicPart.metadata != undefined) {
      const props = {
        data: part,
        logline: relatedCosmicPart.metadata.part_logline,
        partImage: relatedCosmicPart.metadata.part_image
      } as PartCardProps;
      elements.push(
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4} >
          <PartCard key={part.key} {...props}></PartCard>
        </Grid>
      );
    }
  });

  return elements;
}

const Parts = (props: Props): JSX.Element => {
  if (props == undefined || props.navData == undefined || props.parts == undefined) {
    return <NotFoundPage requestedItem={`Read Home`} />
  }

  const partCards = MakePartCards(props.navData.data.parts, props.parts);

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
  const result = await getSiteData();
  const partResults = await getParts();

  const cleanedNav = MapSiteData(result);
  return {
    props: {
      navData: cleanedNav,
      parts: partResults
    } as Props,
    revalidate: 120
  };
};