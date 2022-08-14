import { createTheme } from '@mui/material/styles';

export const ignitionTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: '#424242'
        },
        primary: {
            main: '#39cdb2',
        },
        secondary: {
            main: '#cd3954',
        },
        error: {
            main: '#ff8f00',
        },
        warning: {
            main: '#ffea00',
        },
        success: {
            main: '#39cd68',
        },
        info: {
            main: '#b239cd',
        },
        text: {
            primary: "#ffffff",
            secondary: "#ffffff"
        }
    },
    typography: {
        fontFamily: 'Oswald',
        fontWeightLight: 100,
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
            fontWeight: 100,
        },
        body1: {
            fontWeight: 100,
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