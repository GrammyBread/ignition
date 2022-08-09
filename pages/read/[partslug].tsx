import { GetStaticProps, GetStaticPaths } from 'next';
import { NavigationData, Part } from '../../interfaces/read-metadata.interfaces';
import { getNavigation, getPart } from '../../lib/api/client';
import ErrorPage from 'next/error';
import * as React from 'react';
import Image from 'next/image';
import Styles from '../../styles/shared.module.scss';
import { TableOfContentsProps, TOCPartProps } from '../../components/TableOfContents/TableOfContents';
import TableOfContents from '../../components/TableOfContents/TableOfContents';
import Layout from '../../components/Main/Layout';

const drawerWidth = 240;

interface Props
{
  part?: Part;
  navData?: NavigationData;
}

const Part = ( props: Props ): JSX.Element =>
{
  if ( props.part?.metadata == undefined || props.navData == undefined )
  {
    return <ErrorPage statusCode={ 404 } />;
  }

  props.navData.navWidth = drawerWidth;

  let tocProps = {
    partProps: {
      partData: props.part.metadata.table_of_contents_data,
      partDetails: props.part
    } as TOCPartProps
  } as TableOfContentsProps;

    let table = <TableOfContents { ...tocProps }></TableOfContents>;

    return (
      <Layout navData={ props.navData }>
        { table }
        <Image className={ Styles.backgroundImage } src={ props.part.metadata.table_of_contents_image.url } layout="fill" objectFit='cover' objectPosition='center' />
      </Layout>
    );
};

export default Part;

export const getStaticProps: GetStaticProps = async ( context ) =>
{
  let data = undefined;
  let navData = await getNavigation();
  let slug = context?.params?.partslug;
  if ( slug != undefined )
  {
    data = await getPart( slug.toString() );
  }
  return {
    props: {
      part: data,
      navData: navData
    } as Props,
    revalidate: 120
  };
};

export const getStaticPaths: GetStaticPaths = async () =>
{
  const result = await getNavigation() || [];
  let availablePaths = result.metadata.published_parts.map( ( part ) => ( {
    params: { partslug: part.slug },
  } ) );
  return {
    paths: availablePaths,
    fallback: false,
  };
};
