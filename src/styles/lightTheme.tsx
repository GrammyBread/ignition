import { createTheme } from '@mui/material/styles';

export const ignitionThemeLight = createTheme({
    palette: {
        mode: 'light',
        background: {
            paper: 'rgba(238, 238, 238, .9)',
            default: '#ffffff',
        },
        primary: {
            main: '#39cdb2',
        },
        secondary: {
            main: '#cd3954',
        },
        error: {
            main: '#f44336'
        },
        warning: {
            main: '#ffea00',
        },
        success: {
            main: '#39cd68',
        },
        info: {
            main: '#ffffff',
            contrastText: '#000000'
        },
        text: {
            primary: "#000000",
            secondary: "#000000"
        }
    },
    typography: {
        fontFamily: 'var(--oswald-font)',
        fontWeightLight: 300,
        fontWeightMedium: 500,
        fontWeightRegular: 400,
        fontWeightBold: 700,
        h1: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 700,
        },
        subtitle1: {
            fontWeight: 100,
        },
        subtitle2: {
            fontWeight: 100,
        },
        overline: {
            fontWeight: 500,
        },
        caption: {
            fontWeight: 400,
        },
        body2: {
            fontWeight: 300,
        },
        body1: {
            fontWeight: 300,
        },
        h5: {
            fontWeight: 700,
        },
        h4: {
            fontWeight: 1000,
        },
        h2: {
            fontWeight: 700,
        },
    }
});