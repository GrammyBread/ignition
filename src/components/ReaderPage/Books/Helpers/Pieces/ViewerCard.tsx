import { CardContent, styled } from "@mui/material";

export const ViewerCard = styled(CardContent, {
    shouldForwardProp: (prop) => prop !== "maxWidth" && prop !== "paddingConfig"
  })<{
    maxWidth?: string;
    paddingConfig?: string;
  }>(({ theme, maxWidth, paddingConfig }) => ({
    width: maxWidth,
    margin: "auto",
    padding: paddingConfig,
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