import { Container, styled } from "@mui/material";

export const FlexViewHolder = styled(Container, { 
  shouldForwardProp: (prop) => 
  prop !== 'determinedPadding'})<{
    determinedPadding: string;
  }>(({ theme, determinedPadding }) => ({
    backgroundColor: "white",
    position: 'relative',
    height: "100%",
    border: `5px solid ${theme.palette.primary.dark}`,
    borderBottom: "0px",
    padding: determinedPadding,
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