import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps as MuiAppBarProps } from '@mui/material';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    drawerWidth?: number;
}

interface ImageProps {
    drawerWidth?: number;
}

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop != 'drawerWidth',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    }),
}));

export const ImageContainer = styled('div', {
    shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<ImageProps>(({ drawerWidth }) => ({
    position: 'absolute',
    top: '0px',
    right: '0px',
    height: '100%',
    width: `calc(100% - ${drawerWidth}px)`,
}));
