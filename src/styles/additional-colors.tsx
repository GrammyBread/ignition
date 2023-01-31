import { Theme } from "@mui/material";

export const NavigationBackgroundColor = (theme: Theme): string => {
    return theme.palette.mode === "dark" ? "#424242" : "#EEEEEE";
}
