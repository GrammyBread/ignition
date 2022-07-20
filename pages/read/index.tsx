import { GetStaticProps } from 'next';
import { NavigationData, Part } from '../../interfaces/read-metadata.interfaces';
import { getNavigation, getParts } from '../../lib/api/client';
import ErrorPage from 'next/error';
import { Box, ThemeProvider } from '@mui/material';
import { ignitionTheme } from '../../styles/theme';
import Navigation from '../../components/Navigation/Navigation';
import * as React from 'react';
import { styled } from '@mui/material/styles';

interface Props {
  parts: Part[];
  navData: NavigationData;
}

const PageRoot = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

const Parts = (props: Props): JSX.Element => {  

  if (props == undefined) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <ThemeProvider theme={ignitionTheme}>
      <Box className='main'>
        <Navigation {...props.navData}></Navigation>
        <PageRoot className='root'>
          {props?.parts.map((part: Part) => { return <p key={part.slug}>{part.title}</p> })}
        </PageRoot>
      </Box>
    </ThemeProvider>
  );
};

export default Parts;

export const getStaticProps: GetStaticProps = async (context) => {
  const result = await getParts();
  const navResult = await getNavigation();

  return {
    props: {
      parts: result,
      navData: navResult
    } as Props,
    revalidate: 120
  };
};