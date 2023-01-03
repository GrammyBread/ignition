import { Container, styled } from "@mui/material";

export const FlexViewHolder = styled(Container)(({ theme }) => ({
    backgroundColor: "white",
    position: 'relative',
    height: "100%",
    border: `5px solid ${theme.palette.primary.dark}`,
    borderBottom: "0px",
    padding: "0 auto",
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