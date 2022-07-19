import { GetStaticProps } from 'next';
import { Part } from '../../interfaces/read-metadata.interfaces';
import { getParts } from '../../lib/api/client';
import ErrorPage from 'next/error';
import { Box, ThemeProvider } from '@mui/material';
import { ignitionTheme } from '../../styles/theme';
import { FooterProps } from '../../components/Footer/Footer';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Nav/Nav';
import * as React from 'react';
import { styled } from '@mui/material/styles';

interface Props {
  parts: Part[];
}

const PageRoot = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

const Parts = (props: Props): JSX.Element => {  
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  let footerProps = {
    setState: toggleDrawer,
    state: open
  } as FooterProps;

  if (props == undefined) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <ThemeProvider theme={ignitionTheme}>
      <Box className='main'>
        <Navigation {...footerProps}></Navigation>
        <PageRoot className='root'>
          {props?.parts.map((part: Part) => { return <p key={part.slug}>{part.title}</p> })}
        </PageRoot>

        <Footer {...footerProps}></Footer>
      </Box>
    </ThemeProvider>
  );
};

export default Parts;

export const getStaticProps: GetStaticProps = async (context) => {
  const result = await getParts();

  return {
    props: {
      parts: result
    } as Props,
    revalidate: 120
  };
};