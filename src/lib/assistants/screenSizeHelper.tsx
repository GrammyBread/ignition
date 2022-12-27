import { useMediaQuery, useTheme } from "@mui/material";

export enum ScreenSize {
    tiny,
    small,
    medium,
    large,
    giant
}

export function DetectScreenSize(): ScreenSize {
    const theme = useTheme();
    const isTinyScreen = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSmallScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLargeScreen = useMediaQuery(theme.breakpoints.between("lg", "xl"));

    if(isTinyScreen) return ScreenSize.tiny;
    else if(isSmallScreen) return ScreenSize.small;
    else if(isMediumScreen) return ScreenSize.medium;
    else if(isLargeScreen) return ScreenSize.large;
    else return ScreenSize.giant;
}
