import {
  useTheme,
  CardHeader,
  useMediaQuery,
  IconButton,
  Typography,
  SwipeableDrawer,
} from "@mui/material";
import { EpubReaderType } from "../../Helpers/enums";
import { Orientiation } from "../../Helpers/enums";
import { ViewerLoading } from "../../../EpubViewer/ViewerLoading";
import { EpubViewer } from "../../../EpubViewer/EPubViewer";
import { BookOptions } from "epubjs/types/book";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarkDrawer from "../../Bookmarks/BookmarkDrawer";
import { NavItem } from "epubjs";
import { ViewerHolder } from "../../Helpers/Pieces/ViewerHolder";
import { ViewerCard } from "../../Helpers/Pieces/ViewerCard";
import { PageProps } from "../../Helpers/interfaces";

function DetermineContentWidth(type: EpubReaderType): string {
  if (type === EpubReaderType.fullPageWidth) return "calc(8.5in + .5in + 10px)";
  else if (type === EpubReaderType.halfPageWidth)
    return "calc(5.5in + .5in + 10px)";
  else return "min(calc(5.5in + 10px), 100%)";
}

function DetermineViewerWidth(type: EpubReaderType): string {
  if (type === EpubReaderType.fullPageWidth) return "calc(8.5in + 10px)";
  else if (type === EpubReaderType.halfPageWidth) return "calc(5.5in + 10px)";
  else return "min(calc(5.5in + 10px), calc(100% - 10px))";
}

export default function Page(props: PageProps): JSX.Element {
  const theme = useTheme();
  const isLandscapeMode = useMediaQuery("(orientation: landscape)");
  const isPortraitMode = useMediaQuery("(orientation: portrait)");
  const [isLoading, setIsLoading] = useState(true);
  const [orientation, setOrientation] = useState<Orientiation>(
    isPortraitMode ? Orientiation.portrait : Orientiation.landscape
  );
  const [open, setOpen] = useState(false);
  const [navigationItems, setNavigationItems] = useState<NavItem[] | undefined>(
    undefined
  );
  const contentRef = useRef(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let frame: HTMLIFrameElement | undefined;
  useEffect(() => {
    const availableFrames =
      typeof window !== undefined &&
      window.document.getElementsByTagName("iframe");
    if (availableFrames && availableFrames.length > 0) {
      frame = availableFrames[0];
    }
    setOrientation(
      isPortraitMode ? Orientiation.portrait : Orientiation.landscape
    );
  }, [isLandscapeMode, isPortraitMode]);

  const locationChanged = (elementID: string) => {
    console.log(`New Location selected: ${elementID}`);
    if (frame?.contentDocument?.location) {
      const locationParts = frame.contentDocument.location.href.split("#");
      frame.contentDocument.location.assign(
        `${(locationParts.length > 0 && locationParts[0]) || ""}#${elementID}`
      );
    }
  };

  const initConfig = {} as BookOptions;

  const loadingView = <ViewerLoading />;
  const viewer = (
    <EpubViewer
      url={props.EPubURL}
      bookTitle="testDocument"
      orientation={orientation}
      epubInitOptions={initConfig}
      setIsLoading={setIsLoading}
      renditionWidth={DetermineViewerWidth(props.setting)}
      tocChanged={setNavigationItems}
    />
  );

  return (
    <>
      <CardHeader
        sx={{
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
        }}
        disableTypography={true}
        elevation={10}
        title={
          <Typography component={"h4"} variant={"body1"} fontWeight={700}>
            {props.title}
          </Typography>
        }
        action={
          <IconButton
            aria-label="Open navigation"
            sx={{ color: theme.palette.primary.contrastText }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
        }
      />
      <ViewerCard
        ref={contentRef}
        maxWidth={DetermineContentWidth(props.setting)}
        paddingConfig={"0 !important"}
        onClick={handleDrawerClose}
      >
        <SwipeableDrawer
          container={contentRef.current}
          anchor="right"
          open={open}
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
          disableDiscovery={true}
          hideBackdrop={true}
          disableBackdropTransition={true}
          transitionDuration={0}
        >
          <BookmarkDrawer
            closeDrawer={handleDrawerClose}
            setLocation={locationChanged}
            locations={navigationItems}
          />
        </SwipeableDrawer>
        <ViewerHolder>
          {viewer}
          {isLoading && <ViewerLoading />}
        </ViewerHolder>
        <div id={"reader"}></div>
      </ViewerCard>
    </>
  );
}
