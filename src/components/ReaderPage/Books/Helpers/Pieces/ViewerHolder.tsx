import { Container, styled } from "@mui/material";

export const ViewerHolder = styled(Container)(({ theme }) => ({
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