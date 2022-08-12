
import { ThemeProvider, Box, CssBaseline } from '@mui/material';
import { ignitionTheme } from '../../styles/theme';
import Navigation from './Navigation/Navigation';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Styles from '../../styles/shared.module.scss';
import { CosmicSiteData } from '../../interfaces/read-metadata.interfaces';
import { Main } from './Main';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export interface LayoutProps {
    children: React.ReactNode;
    navData: CosmicSiteData;
}

const PageRoot = styled(Box)( ( { theme } ) => ( {
    maxHeight: '100%',
    display: 'flex'
  } ) );

  
enum ScreenSize {
  Tiny = 240,
  Small = 300,
  Medium = 350,
  Large = 400,
  Giant = 500
}

export default function Layout({ children, navData }: LayoutProps) {
  const [open, setOpen] = React.useState(false);
  const [drawerWidth, setDrawerWidth] = React.useState(ScreenSize.Tiny);

  const handleDrawerOpen = () => {
      setOpen(true);
  };

  const handleDrawerClose = () => {
      setOpen(false);
  };

  const theme = useTheme();
  const isTinyScreen = useMediaQuery(theme.breakpoints.between('xs','sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('sm','md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md','lg'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.between('lg','xl'));
  const isGiantScreen = useMediaQuery(theme.breakpoints.up('xl'));

  React.useEffect(() => {
      if(isTinyScreen && drawerWidth != ScreenSize.Tiny) {
          setDrawerWidth(ScreenSize.Tiny)
      }
      else if(isSmallScreen && drawerWidth != ScreenSize.Small) {
          setDrawerWidth(ScreenSize.Small)
      }
      else if(isMediumScreen && drawerWidth != ScreenSize.Medium) {
          setDrawerWidth(ScreenSize.Medium)
      }
      else if(isLargeScreen && drawerWidth != ScreenSize.Large) {
          setDrawerWidth(ScreenSize.Large)
      }
      else if(isGiantScreen && drawerWidth != ScreenSize.Giant) {
          setDrawerWidth(ScreenSize.Giant)
      }

    }, [isTinyScreen, isSmallScreen, isMediumScreen, isLargeScreen, isGiantScreen]); // Only re-run the effect if count changes


  return (
    <>
    <React.Fragment>
      <ThemeProvider theme={ ignitionTheme }>
        <PageRoot className={ Styles.root }>
          <CssBaseline />
          <Navigation 
            drawerWidth={drawerWidth} 
            navData={navData} 
            open={open} 
            openDrawer={handleDrawerOpen} 
            closeDrawer={handleDrawerClose}></Navigation>
          <Main open={open} drawerWidth={drawerWidth} >{children}</Main>
        </PageRoot>
      </ThemeProvider>
    </React.Fragment>
    </>
  )
}