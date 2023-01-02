import {
  CardContent,
  useTheme,
  CardHeader,
  useMediaQuery,
  IconButton,
  Typography,
  Container,
  styled,
  SwipeableDrawer,
} from "@mui/material";
import { EpubReaderType, Orientiation } from "../helpers";
import { ViewerLoading } from "../../EpubViewer/ViewerLoading";
import { EpubViewer } from "../../EpubViewer/EPubViewer";
import { BookOptions } from "epubjs/types/book";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LocationDrawer from "./LocationDrawer";
import { NavItem } from "epubjs";

const ViewerHolder = styled(Container)(({ theme }) => ({
  backgroundColor: "white",
  height: "100%",
  border: `5px solid ${theme.palette.primary.dark}`,
  borderBottom: "0px",
  ["&::-webkit-scrollbar"]: {
    height: "5px",
    width: "5px",
    background: theme.palette.primary.dark,
    borderRadius: "1ex",
  },
  ["&::-webkit-scrollbar-thumb"]: {
    background: "white",
    borderRadius: "1ex",
  },
  ["&::-webkit-scrollbar-corner"]: {
    background: theme.palette.primary.dark,
  },
}));

const PageCardContent = styled(CardContent, {
  shouldForwardProp: (prop) => prop !== "maxWidth",
})<{
  maxWidth?: string;
}>(({ theme, maxWidth }) => ({
  width: maxWidth,
  margin: "auto",
  paddingTop: 0,
  paddingBottom: '0 !important',
  height: `calc(100% - (1rem + ${theme.spacing(6)}))`,
  [".MuiDrawer-modal"]: {
    position: "absolute",
    top: 0,
    bottom: 0,
    [".MuiPaper-root"]: {
      position: "relative",
      width: "50%",
      marginLeft: "auto",
      top: `calc(1rem + ${theme.spacing(6)})`,
      maxHeight: `calc(100% - (1rem + ${theme.spacing(6)}))`,
    },
  },
}));

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

export interface PageProps {
  EPubURL: string;
  title: string;
  setting: EpubReaderType;
}

export default function Page(props: PageProps): JSX.Element {
  const theme = useTheme();
  const isLandscapeMode = useMediaQuery("(orientation: landscape)");
  const isPortraitMode = useMediaQuery("(orientation: portrait)");
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
  let baseLocation: string | undefined;
  const availableFrames = window.document.getElementsByTagName("iframe");
  if (availableFrames.length > 0) {
    frame = availableFrames[0];
  }

  const locationChanged = (elementID: string) => {
    console.log(`New Location selected: ${elementID}`);
    if (frame?.contentDocument?.location) {
        const locationParts = frame.contentDocument.location.href.split("#");
        frame.contentDocument.location.assign(`${locationParts.length > 0 && locationParts[0] || ''}#${elementID}`);
    }
  };

  useEffect(() => {
    setOrientation(
      isPortraitMode ? Orientiation.portrait : Orientiation.landscape
    );
  }, [isLandscapeMode, isPortraitMode]);

  const initConfig = {} as BookOptions;

  const loadingView = <ViewerLoading />;
  const viewer = (
    <EpubViewer
      url={props.EPubURL}
      bookTitle="testDocument"
      orientation={orientation}
      loadingView={loadingView}
      epubInitOptions={initConfig}
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
      <PageCardContent
        ref={contentRef}
        maxWidth={DetermineContentWidth(props.setting)}
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
          <LocationDrawer
            closeDrawer={handleDrawerClose}
            setLocation={locationChanged}
            locations={navigationItems}
          />
        </SwipeableDrawer>
        <ViewerHolder>{viewer}</ViewerHolder>
        <div id={"reader"}></div>
      </PageCardContent>
    </>
  );
}
