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
import NotFoundPage from '../../components/Error/NotFound';
import { Character } from '../../interfaces/static/character.interface';
import { Container } from '@mui/material';

interface Props {
  navData: CleanedNavigation;
  characters: Character[];
}

function MakeCharacterCard(characters: Character): JSX.Element[] {
  let elements = new Array<JSX.Element>();
 
  return elements;
}

const Characters = (props: Props): JSX.Element => {
  if (props == undefined || props.navData == undefined || props.characters == undefined) {
    return <NotFoundPage requestedItem={`Character Page`}/>
  }


  return (
    <Layout navData={props.navData}>
      <Container maxWidth="lg">
        <Image className={Styles.backgroundImage} src="/assets/SiteBack.svg" layout="fill" objectFit='cover' objectPosition='center' />
      </Container>
    </Layout>
  );
};

export default Characters;

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