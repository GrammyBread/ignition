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
      elements.push(<PartCard key={part.key} {...props}></PartCard>);
    }
  });

  return elements;
}

const Parts = (props: Props): JSX.Element => {
  if (props == undefined || props.navData == undefined || props.parts == undefined) {
    return <NotFoundPage requestedItem={`Read Home`}/>
  }

  const partCards = MakePartCards(props.navData.data.parts, props.parts);

  return (
    <Layout navData={props.navData}>
      <div>
        {partCards}
        <Image className={Styles.backgroundImage} src="/assets/SiteBack.svg" layout="fill" objectFit='cover' objectPosition='center' />
      </div>
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