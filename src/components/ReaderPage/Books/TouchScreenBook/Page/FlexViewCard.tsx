import { styled } from '@mui/material';

export const FlexViewCard = styled('div', { 
  shouldForwardProp: (prop) => 
  prop !== 'open' && 
  prop !== 'drawerWidth' && 
  prop !== 'determinedWidth' && 
  prop !== 'determinedPadding'})<{
    open?: boolean;
    drawerWidth: number;
    determinedWidth: string;
    determinedPadding: string;
  }>(({ theme, open, drawerWidth, determinedWidth, determinedPadding }) => ({
    flexGrow: 1,
    padding: determinedPadding,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    margin: "auto",
    maxWidth: determinedWidth,
    height: `calc(100% - (1rem + ${theme.spacing(5)}))`,
    position: 'relative',
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
      marginLeft: 0
    }),
  }));