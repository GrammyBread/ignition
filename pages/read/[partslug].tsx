import { GetStaticProps, GetStaticPaths } from 'next';
import { NavigationData, Part } from '../../interfaces/read-metadata.interfaces';
import { getNavigation, getPart } from '../../lib/api/client';
import ErrorPage from 'next/error';
import { ThemeProvider } from '@mui/material';
import { ignitionTheme } from '../../styles/theme';
import Navigation from '../../components/Navigation/Navigation';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Image from 'next/image';
import Styles from '../../styles/parts.module.scss';
import { Main } from '../../components/Main/Main';
import PartCard from '../../components/PartCard/PartCard';

const drawerWidth = 240;

interface Props {
  part?: Part;
  navData: NavigationData;
}
const PageRoot = styled('div')(({ theme }) => ({
  maxHeight: '100%',
}));

const Part = (props: Props): JSX.Element => {
  if (props.part?.metadata == undefined ) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <React.Fragment>
      <ThemeProvider theme={ignitionTheme}>
        <PageRoot className={Styles.root}>
          <CssBaseline/>
          <Navigation {...props.navData}></Navigation>
          <Main>
            {props?.navData.metadata.published_parts.map((part: Part) => (<PartCard key={part.slug} {...part}></PartCard>))}
          </Main>
          <Image className={Styles.backgroundImage} src={props.part.metadata.table_of_contents_image.url} layout="fill" objectFit='cover' objectPosition='center'/>
        </PageRoot>
      </ThemeProvider>
    </React.Fragment>
  )
};

export default Part;

export const getStaticProps: GetStaticProps = async (context) => {
  let data = undefined;
  let slug = context?.params?.partslug;
  if (slug != undefined) {
    data = await getPart(slug.toString());
  }
  return {
    props: {
      part: data,
    } as Props,
    revalidate: 120
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getNavigation() || [];
  let availablePaths = result.metadata.published_parts.map((part) => ({
    params: { partslug: part.slug },
  }));
  return {
    paths: availablePaths,
    fallback: false,
  }
};
