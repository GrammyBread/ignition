import { styled } from '@mui/material/styles';

export const Main = styled('main', { 
    shouldForwardProp: (prop) => prop !== 'open' && 
    prop !== 'drawerWidth' && 
    prop !== 'isReadingView' &&
    prop !== 'disableAllPadding' })<{
    open?: boolean;
    drawerWidth?: number;
    disableAllPadding?: boolean;
}>(({ theme, open, drawerWidth, disableAllPadding }) => ({
    flexGrow: 1,
    display: open ? 'none' : 'auto',
    marginTop: `5rem`,
    padding: disableAllPadding ? 
    `0` :
    theme.spacing(3),
    maxHeight: '100%',
    maxWidth: '100%',
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
    }),
}));