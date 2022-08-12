import { GetStaticProps } from 'next';
import { CosmicSiteData, CosmicPart } from '../../interfaces/read-metadata.interfaces';
import { getNavigation } from '../../lib/api/client';
import ErrorPage from 'next/error';
import { ThemeProvider } from '@mui/material';
import { ignitionTheme } from '../../styles/theme';
import Navigation from '../../components/Main/Navigation/Navigation';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Image from 'next/image';
import Styles from '../../styles/parts.module.scss';
import { Main } from '../../components/Main/Main';
import PartCard from '../../components/PartCard/PartCard';
import Layout from '../../components/Main/Layout';

const drawerWidth = 240;

interface Props
{
  navData: CosmicSiteData;
}

const Parts = ( props: Props ): JSX.Element =>
{
  if ( props == undefined )
  {
    return <ErrorPage statusCode={ 404 } />;
  }

  return (
  <Layout navData={props.navData}>
    { props?.navData.metadata.published_parts.map( ( part: CosmicPart ) => ( <PartCard key={ part.slug } { ...part }></PartCard> ) ) }
    <Image className={ Styles.backgroundImage } src="/assets/SiteBack.svg" layout="fill" objectFit='cover' objectPosition='center' />
  </Layout>
  );
};



export default Parts;

export const getStaticProps: GetStaticProps = async ( context ) =>
{
  const result = await getNavigation();

  return {
    props: {
      navData: result,
    } as Props,
    revalidate: 120
  };
};