import { styled, AppBarProps } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

interface BookmarkHeaderProps extends AppBarProps {
    open?: boolean;
    drawerWidth: number;
}

export const BookmarkHeader = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth'
})<BookmarkHeaderProps>(({ theme, open, drawerWidth }) => ({   
    position: "relative",
    zIndex: "1000",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));