import { GetStaticProps } from 'next';
import { NavigationData, Part } from '../../interfaces/read-metadata.interfaces';
import { getNavigation } from '../../lib/api/client';
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
  navData: NavigationData;
}
const PageRoot = styled('div')(({ theme }) => ({
  maxHeight: '100%',
}));

const Parts = (props: Props): JSX.Element => {
  if (props == undefined) {
    return <ErrorPage statusCode={404} />
  }

  props.navData.navWidth = drawerWidth;

  return (
    <React.Fragment>
      <ThemeProvider theme={ignitionTheme}>
        <PageRoot className={Styles.root}>
          <CssBaseline/>
          <Navigation {...props.navData}></Navigation>
          <Main>
            {props?.navData.metadata.published_parts.map((part: Part) => (<PartCard key={part.slug} {...part}></PartCard>))}
          </Main>
          <Image className={Styles.backgroundImage} src="/assets/SiteBack.svg" layout="fill" objectFit='cover' objectPosition='center'/>
        </PageRoot>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Parts;

export const getStaticProps: GetStaticProps = async (context) => {
  const result = await getNavigation();

  return {
    props: {
      navData: result,
    } as Props,
    revalidate: 120
  };
};