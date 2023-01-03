import {
  useTheme,
  IconButton,
  Typography,
  Toolbar,
  Drawer,
  setRef,
  Theme,
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
import { PageProps } from "../../Helpers/interfaces";
import { BookmarkHeader } from "./BookmarkHeader";
import { FlexViewCard } from "./FlexViewCard";
import { ChevronRight, ExitToApp } from "@mui/icons-material";
import {
  DetectScreenSize,
  ScreenSize,
} from "../../../../../../lib/assistants/screenSizeHelper";
import { FlexViewHolder } from "./FlexViewHolder";

enum ScreenSizePixels {
  Tiny = 240,
  Small = 300,
  Medium = 350,
  Large = 400,
  Giant = 500,
}

export interface TouchScreenPageProps extends PageProps {
  orientation: Orientiation;
  exitReader: () => void;
}

function DetermineContentWidth(type: EpubReaderType): string {
  if (type === EpubReaderType.fullPageWidth) return "calc(8.5in + 10px)";
  else if (type === EpubReaderType.halfPageWidth) return "calc(5.5in + 10px)";
  else return "min(calc(5.5in + 10px), 100vw)";
}

function DeterminePadding(type: EpubReaderType, theme: Theme): string {
  if (type === EpubReaderType.fullWidth) return `0`;
  else return `0 ${theme.spacing(3)}`;
}

function DetermineViewerWidth(type: EpubReaderType): string {
  if (type === EpubReaderType.fullPageWidth) return "calc(8.5in)";
  else if (type === EpubReaderType.halfPageWidth) return "calc(5.5in)";
  else return "min(calc(5.5in), 100vw)";
}

export default function Page(props: TouchScreenPageProps): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [drawerWidth, setDrawerWidth] = useState(100);
  const [navigationItems, setNavigationItems] = useState<NavItem[] | undefined>(
    undefined
  );
  const contentRef = useRef(null);
  const iFrame = useRef<HTMLIFrameElement>(null);
  const detectedScrenSize = DetectScreenSize();

  const setTOCLoaded = (items: NavItem[]) => {
    setNavigationItems(items);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isLoading) {
      const availableFrames =
        typeof window !== undefined &&
        window.document.getElementsByTagName("iframe");
      if (availableFrames && availableFrames.length > 0) {
        setRef(iFrame, availableFrames[0]);
      }
    }
  }, [isLoading]);

  useEffect(() => {
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
  }, [detectedScrenSize]);

  const locationChanged = (elementID: string) => {
    console.log(`New Location selected: ${elementID}`);
    if (
      iFrame &&
      iFrame.current != null &&
      iFrame.current?.contentDocument?.location
    ) {
      const contentDoc = iFrame.current.contentDocument;
      const locationParts = contentDoc.location.href.split("#");
      contentDoc.location.assign(
        `${(locationParts.length > 0 && locationParts[0]) || ""}#${elementID}`
      );
    }
  };

  const initConfig = {} as BookOptions;
  const viewer = (
    <EpubViewer
      url={props.EPubURL}
      bookTitle="testDocument"
      orientation={props.orientation}
      epubInitOptions={initConfig}
      renditionWidth={DetermineViewerWidth(props.setting)}
      tocChanged={setTOCLoaded}
      setIsLoading={setIsLoading}
    />
  );

  return (
    <>
      <BookmarkHeader open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => props.exitReader()}
          >
            <ExitToApp />
          </IconButton>
          <Typography
            component={"h4"}
            noWrap
            sx={{ flexGrow: 1 }}
            variant={"body1"}
            fontWeight={700}
          >
            {props.title}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronRight /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </BookmarkHeader>
      <FlexViewCard
        ref={contentRef}
        onClick={handleDrawerClose}
        determinedWidth={DetermineContentWidth(props.setting)}
        determinedPadding={DeterminePadding(props.setting, theme)}
        drawerWidth={drawerWidth}
        open={open}
      >
        <FlexViewHolder
          determinedPadding={
            props.setting === EpubReaderType.fullWidth
              ? "0 !important"
              : "0 auto"
          }
        >
          {isLoading && <ViewerLoading />}
          {viewer}
        </FlexViewHolder>
      </FlexViewCard>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            zIndex: 1000,
            height: `calc(100% - ${theme.spacing(9)})` ,
            marginTop: theme.spacing(9)
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <BookmarkDrawer
          closeDrawer={handleDrawerClose}
          setLocation={locationChanged}
          locations={navigationItems}
        />
      </Drawer>
    </>
  );
}
