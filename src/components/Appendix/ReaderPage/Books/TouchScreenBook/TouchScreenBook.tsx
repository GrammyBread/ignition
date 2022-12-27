import { Skeleton, styled, SwipeableDrawer, Typography } from "@mui/material";
import { DisplayedLocation } from "epubjs/types/rendition";
import React, { useState, useEffect } from "react";
import { BookOptions } from "epubjs/types/book";
import { useTheme } from "@mui/material";
import Styles from "./TouchScreenBook.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import { ChevronLeft, ChevronRight, PropaneSharp } from "@mui/icons-material";
import { Box } from "@mui/system";
import {
  DetectScreenSize,
  ScreenSize,
} from "../../../../../lib/assistants/screenSizeHelper";
import { BookProperties, Orientiation } from "../helpers";
import { ViewerLoading } from "../../EpubViewer/ViewerLoading";
import { EpubDetails } from '../../../../../interfaces/epub/epub-reader.interface';

interface CustomReaderProps {
  resourceUrl: string;
  title: string;
}

const Cover = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: `solid ${theme.palette.primary.light}`,
  borderWidth: "5px 5px 0 5px",
  left: `${theme.spacing(2)}`,
  position: "absolute",
}));

enum ScreenSizePixels {
  Tiny = 56,
  Small = 56,
  Medium = 100,
  Large = 150,
  Giant = 200,
}

export default function TouchScreenBook(details: BookProperties) {
  const isLandscapeMode = useMediaQuery("(orientation: landscape)");
  const isPortraitMode = useMediaQuery("(orientation: portrait)");
  // And your own state logic to persist state
  const [location, setLocation] = useState<DisplayedLocation | undefined>(
    undefined
  );
  const [bookOpen, setBookOpen] = useState<boolean>(false);
  const [drawerWidth, setDrawerWidth] = React.useState(ScreenSizePixels.Tiny);
  const [orientation, setOrientation] = useState<Orientiation>(
    isPortraitMode ? Orientiation.portrait : Orientiation.landscape
  );

  useEffect(() => {
    setOrientation(
      isPortraitMode ? Orientiation.portrait : Orientiation.landscape
    );
    console.log(
      `orientation| lanscape: ${isLandscapeMode}. portrait: ${isPortraitMode}`
    );
  }, []);

  const detectedScreenSize = DetectScreenSize();

  React.useEffect(() => {
    if (detectedScreenSize === ScreenSize.tiny) {
      setDrawerWidth(ScreenSizePixels.Tiny);
    } else if (detectedScreenSize === ScreenSize.small) {
      setDrawerWidth(ScreenSizePixels.Small);
    } else if (detectedScreenSize === ScreenSize.medium) {
      setDrawerWidth(ScreenSizePixels.Medium);
    } else if (detectedScreenSize === ScreenSize.large) {
      setDrawerWidth(ScreenSizePixels.Large);
    } else if (detectedScreenSize === ScreenSize.giant) {
      setDrawerWidth(ScreenSizePixels.Giant);
    }
  }, [detectedScreenSize, isLandscapeMode, isPortraitMode]); // Only re-run the effect if count changes

  const toggleBookCover = (newOpen: boolean) => () => {
    setBookOpen(newOpen);
  };

  const locationChanged = (epubcifi: DisplayedLocation) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
  };

  const theme = useTheme();

  const initConfig = {} as BookOptions;

  const loadingView = <ViewerLoading />;

  return (
    <SwipeableDrawer
      container={details.reference.current}
      anchor="left"
      open={bookOpen}
      onClose={toggleBookCover(false)}
      onOpen={toggleBookCover(true)}
      swipeAreaWidth={drawerWidth}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Cover
        sx={{
          position: "absolute",
          left: "10vw",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: "visible",
          bottom: 0,
          top: 0,
        }}
      >
        <div className={classNames(Styles.puller)}>
          {bookOpen ? (
            <ChevronLeft fontSize="large"></ChevronLeft>
          ) : (
            <ChevronRight fontSize="large"></ChevronRight>
          )}
        </div>
        <Typography sx={{ p: 2, color: "text.secondary" }}>
          51 results
        </Typography>
      </Cover>
      <Cover
        sx={{
          px: 2,
          pb: 2,
          height: "100%",
          overflow: "auto",
        }}
      >
        <Skeleton variant="rectangular" height="100%" />
      </Cover>
    </SwipeableDrawer>
  );

  /* 
  <Paper square elevation={0} id="reader" sx={{
      backgroundColor: theme.palette.primary.main,
      position: 'relative',
      maxHeight: '100%',
      height: '90vh',
      width: '100%'
  }}>
      <div className={classNames(Styles.bookCover)}>
          {
              showPullTab &&
              <div className={classNames(Styles.puller)}>
                  {bookOpen ?
                          <ChevronLeft fontSize='large'></ChevronLeft>
                      :
                          <ChevronRight fontSize='large'></ChevronRight>
                  }
              </div>
          }
          <div className={classNames(Styles.tocToggle, readerTypeStyles.className)}>
              {title}
          </div>
          <Reader className={classNames(Styles.reader, readerTypeStyles.className)}
              color={theme.palette.mode === 'dark' ? '#424242' : '#EEEEEE'}>
              <EpubViewer
                  url={resourceUrl}
                  bookTitle="testDocument"
                  orientation={orientation}
                  loadingView={loadingView}
                  epubInitOptions={initConfig}
                  renditionWidth={readerTypeStyles.viewerWidth}
                  locationChanged={epubcifi => console.log(epubcifi)}
              />
          </Reader>
      </div>
  </Paper>; */
}
