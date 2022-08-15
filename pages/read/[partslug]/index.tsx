import { GetStaticProps, GetStaticPaths } from 'next';
import { CosmicPart } from '../../../interfaces/read/read-metadata.interfaces';
import { getSiteData, getPart, getAvailableParts } from '../../../lib/api/client';
import ErrorPage from 'next/error';
import * as React from 'react';
import Image from 'next/image';
import Styles from '../../../styles/shared.module.scss';
import { TableOfContentsProps } from '../../../components/TableOfContents/Table/Table';
import TableOfContents from '../../../components/TableOfContents/Table/Table';
import Layout from '../../../components/Main/Layout';
import MapSiteData from '../../../mappers/nav.mapper';
import { CleanedNavigation } from '../../../interfaces/read/cleaned-types.interface';
import { GetRequestedResource } from '../../../lib/api/shared';
import NotFoundPage from '../../../components/Error/NotFound';


interface Props {
  part?: CosmicPart;
  navData?: CleanedNavigation;
}

const Part = (props: Props): JSX.Element => {
  let requestedRes = GetRequestedResource();
  let relatedPart;
  if (props.navData != undefined && props.part != undefined) {
    relatedPart = props.navData.data.parts.find((part) => {
      return part.id === props.part?.id
    });
  }

  if (props.part?.metadata == undefined || props.navData == undefined || relatedPart == undefined) {
    return <NotFoundPage requestedItem={`Part: ${requestedRes}`}/>
  }

  let tocProps = {
    partProps: relatedPart
  } as TableOfContentsProps;

  let table = <TableOfContents {...tocProps}></TableOfContents>;

  return (
    <Layout navData={props.navData}>
      {table}
      <Image className={Styles.backgroundImage} src={props.part.metadata.table_of_contents_image.url} layout="fill" objectFit='cover' objectPosition='center' />
    </Layout>
  );
};

export default Part;

export const getStaticProps: GetStaticProps = async (context) => {
  let data = undefined;
  let navData = await getSiteData();
  let slug = context?.params?.partslug;
  if (slug != undefined) {
    data = await getPart(slug.toString());
  }

  const cleanedNav = MapSiteData(navData);

  return {
    props: {
      part: data,
      navData: cleanedNav
    } as Props,
    revalidate: 120
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getAvailableParts();
  let availablePaths = result.map((part) => ({
    params: { partslug: part.slug },
  }));
  return {
    paths: availablePaths,
    fallback: false,
  };
};
