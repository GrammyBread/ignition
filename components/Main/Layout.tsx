
import { ThemeProvider, Box, CssBaseline } from '@mui/material';
import { ignitionThemeDark } from '../../styles/theme';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Styles from '../../styles/shared.module.scss';
import { Main } from './Main';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NavigationProps, Navigation } from './Navigation/Navigation';
import { CleanedNavigation } from '../../interfaces/read/cleaned-types.interface';
import { Section } from '../../interfaces/read/view-data.interfaces';
import Image from 'next/image';
import Head from 'next/head';

export interface LayoutProps {
  children: React.ReactNode;
  navData: CleanedNavigation;
  previousSection?: Section;
  nextSection?: Section;
  backgroundImageUrl?: string;
  socials?: Socials;
}

export interface Socials {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
}

const PageRoot = styled(Box)(({ theme }) => ({
  maxHeight: '100%',
  display: 'flex'
}));


enum ScreenSize {
  Tiny = 240,
  Small = 300,
  Medium = 350,
  Large = 400,
  Giant = 500
}

export default function Layout({ children, navData, previousSection, nextSection, backgroundImageUrl, socials }: LayoutProps) {
  const [open, setOpen] = React.useState(false);
  const [drawerWidth, setDrawerWidth] = React.useState(ScreenSize.Tiny);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isTinyScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isGiantScreen = useMediaQuery(theme.breakpoints.up('xl'));

  React.useEffect(() => {
    if (isTinyScreen && drawerWidth != ScreenSize.Tiny) {
      setDrawerWidth(ScreenSize.Tiny)
    }
    else if (isSmallScreen && drawerWidth != ScreenSize.Small) {
      setDrawerWidth(ScreenSize.Small)
    }
    else if (isMediumScreen && drawerWidth != ScreenSize.Medium) {
      setDrawerWidth(ScreenSize.Medium)
    }
    else if (isLargeScreen && drawerWidth != ScreenSize.Large) {
      setDrawerWidth(ScreenSize.Large)
    }
    else if (isGiantScreen && drawerWidth != ScreenSize.Giant) {
      setDrawerWidth(ScreenSize.Giant)
    }

  }, [isTinyScreen, isSmallScreen, isMediumScreen, isLargeScreen, isGiantScreen]); // Only re-run the effect if count changes


  const navigationProps = {
    drawerWidth: drawerWidth,
    navData: navData,
    open: open,
    openDrawer: handleDrawerOpen,
    closeDrawer: handleDrawerClose,
    previousSection: previousSection,
    nextSection: nextSection
  } as NavigationProps

  return (
    <React.Fragment>
      {
        socials &&
        <Head>
          <meta property="og:url" content={socials.url} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={socials.title} />
          <meta property="og:description" content={socials.description} />
          <meta property="og:image" content={socials.imageUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@TheGrammyBread" />
        </Head>
      }
      <ThemeProvider theme={ignitionThemeDark}>
        <PageRoot className={Styles.root}>
          <CssBaseline />
          <Navigation {...navigationProps}
          ></Navigation>
          <Main open={open} drawerWidth={drawerWidth} >
            {children}
            {backgroundImageUrl && <Image className={Styles.backgroundImage} src={backgroundImageUrl} layout="fill" objectFit='cover' objectPosition='center' />}
          </Main>
        </PageRoot>
      </ThemeProvider>
    </React.Fragment>
  )
}