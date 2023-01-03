import { styled } from '@mui/material';

export const FlexViewCard = styled('div', { 
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth'})<{
    open?: boolean;
    drawerWidth: number;
  }>(({ theme, open, drawerWidth }) => ({
    flexGrow: 1,
    padding: `0 ${theme.spacing(3)}`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    maxWidth: '100%',
    height: `calc(100% - (1rem + ${theme.spacing(6)}))`,
    position: 'relative',
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }));