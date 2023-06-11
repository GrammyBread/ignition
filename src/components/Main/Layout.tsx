import { Box, CssBaseline } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Styles from "../../styles/shared.module.scss";
import { Main } from "./Main";
import { Navigation } from "./Navigation/Navigation";
import Image from "next/image";
import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import { DetectScreenSize, ScreenSize } from "../../lib/assistants/screenSizeHelper";
import { Resource } from "../../interfaces/read/cosmic/cosmic-metadata.interfaces";
import { NavigationSection } from "../../interfaces/read/nav-data.interfaces";

export interface LayoutProps {
  children: React.ReactNode;
  previousSection?: NavigationSection;
  nextSection?: NavigationSection;
  fadeInTrigger?: boolean;
  backgroundImageUrl?: Resource;
  socials?: Socials;
  disableAllPadding?: boolean;
}

export interface Socials {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
}

const PageRoot = styled(Box)(({ theme }) => ({
  maxHeight: "100vh",
  display: "flex",
}));

enum ScreenSizePixels {
  Tiny = 240,
  Small = 300,
  Medium = 350,
  Large = 400,
  Giant = 500,
}

const animationVariants = {
  visible: { opacity: 0.3 },
  hidden: { opacity: 0 },
};

export interface ImageProps {
  backgroundImageUrl: string;
}

const FadeInImage = ({ backgroundImageUrl }: ImageProps) => {
  const animationControls = useAnimation();

  React.useEffect(() => {
    animationControls.set("hidden");
    animationControls.start("visible");
  }, [backgroundImageUrl, animationControls]);

  return (
    <motion.div
      initial={"hidden"}
      animate={animationControls}
      variants={animationVariants}
      className={Styles.bgWrap}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <Image
        alt="background"
        src={backgroundImageUrl}
        key={backgroundImageUrl}
        blurDataURL="/assets/SiteBack.svg"
        fill
        style={{
          objectFit: "cover",
        }}
        quality={100}
      />
    </motion.div>
  );
};

export default function Layout({
  children,
  previousSection,
  nextSection,
  backgroundImageUrl,
  socials,
  disableAllPadding
}: LayoutProps) {
  const [open, setOpen] = React.useState(false);
  const [drawerWidth, setDrawerWidth] = React.useState(ScreenSizePixels.Tiny);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const detectedScrenSize = DetectScreenSize();
  var isLargeScreen = detectedScrenSize === ScreenSize.large || detectedScrenSize === ScreenSize.giant;

  React.useEffect(() => {
    if (detectedScrenSize === ScreenSize.tiny) {
      setDrawerWidth(ScreenSizePixels.Tiny);
    } else if (detectedScrenSize === ScreenSize.small) {
      setDrawerWidth(ScreenSizePixels.Small);
    } else if (detectedScrenSize === ScreenSize.medium) {
      setDrawerWidth(ScreenSizePixels.Medium);
    } else if (detectedScrenSize === ScreenSize.large) {
      setDrawerWidth(ScreenSizePixels.Large);
    } else if (detectedScrenSize === ScreenSize.giant) {
      setDrawerWidth(ScreenSizePixels.Giant);
    }    
    var isLargeScreen = detectedScrenSize === ScreenSize.large || detectedScrenSize === ScreenSize.giant;
  }, [
    detectedScrenSize,
  ]);

  return (
    <React.Fragment>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Only One Way To Burn It Down"
        />
        <meta name="application-name" content="Only One Way To Burn It Down" />
        <meta name="msapplication-TileColor" content="#830303" />
        <meta name="theme-color" content="#ffffff" />
        {socials && (
          <>
            <meta property="og:url" content={socials.url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={socials.title} />
            <meta property="og:description" content={socials.description} />
            <meta property="og:image" content={socials.imageUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@TheGrammyBread" />
          </>
        )}
      </Head>

      <PageRoot>
        <CssBaseline />
        <Navigation         
    drawerWidth={drawerWidth}
    open={open}
    openDrawer={handleDrawerOpen}
    closeDrawer={handleDrawerClose}
    previousScript={previousSection}
    nextScript={nextSection}
        ></Navigation>
        {backgroundImageUrl && (
          <FadeInImage
            backgroundImageUrl={
              isLargeScreen
                ? backgroundImageUrl.url
                : backgroundImageUrl.imgix_url
            }
          />
        )}
        <Main
          open={open}
          drawerWidth={drawerWidth}
          disableAllPadding={disableAllPadding}
        >
          {children}
        </Main>
      </PageRoot>
    </React.Fragment>
  );
}
