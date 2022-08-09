
import { ThemeProvider } from '@mui/material';
import { ignitionTheme } from '../../styles/theme';
import Navigation from '../../components/Navigation/Navigation';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Styles from '../../styles/shared.module.scss';
import { NavigationData } from '../../interfaces/read-metadata.interfaces';
import { getNavigation } from '../../lib/api/client';
import { Main } from './Main';

export interface LayoutProps {
    children: React.ReactNode;
    navData: NavigationData;
}

const fetchNav = async () => {
  const data = await getNavigation();
  return data
}

const PageRoot = styled( 'div' )( ( { theme } ) => ( {
    maxHeight: '100%',
  } ) );

export default function Layout({ children, navData }: LayoutProps) {

  return (
    <>
    <React.Fragment>
      <ThemeProvider theme={ ignitionTheme }>
        <PageRoot className={ Styles.root }>
          <CssBaseline />
          <Navigation { ...navData }></Navigation>
          <Main>{children}</Main>
        </PageRoot>
      </ThemeProvider>
    </React.Fragment>
    </>
  )
}