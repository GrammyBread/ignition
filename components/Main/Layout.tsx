
import { ThemeProvider } from '@mui/material';
import { ignitionTheme } from '../../styles/theme';
import Navigation from '../../components/Navigation/Navigation';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Styles from '../../styles/parts.module.scss';
import useSWR, { Key, Fetcher } from 'swr'
import { NavigationData } from '../../interfaces/read-metadata.interfaces';
import { getNavigation } from '../../lib/api/client';

export interface LayoutProps {
    children: React.ReactNode
}

const PageRoot = styled( 'div' )( ( { theme } ) => ( {
    maxHeight: '100%',
  } ) );

export default function Layout({ children }: LayoutProps) {
    let data = await getNavigation();

  if (!data) return <div>Loading...</div>

  return (
    <>
    <React.Fragment>
      <ThemeProvider theme={ ignitionTheme }>
        <PageRoot className={ Styles.root }>
          <CssBaseline />
          <Navigation { ...data }></Navigation>
          <main>{children}</main>
        </PageRoot>
      </ThemeProvider>
    </React.Fragment>
    </>
  )
}