import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Styles from './Navigation.module.scss';
import Image from 'next/image';
import {
    Slide,
    Toolbar,
    Backdrop,
    Button,
    Box,
    CssBaseline,
    Fab,
    AppBarProps as MuiAppBarProps
} from '@mui/material';
import { Twitter, Instagram } from '@mui/icons-material';
import Link from 'next/link';
import NavigationList from './NavigationList/NavigationList';
import { NavigationListProps } from './NavigationList/NavigationList';
import { CleanedNavigation } from '../../../interfaces/read/cleaned-types.interface';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface ImageProps {
    drawerWidth?: number;
}

export interface NavigationProps {
    navData: CleanedNavigation;
    drawerWidth: number;
    openDrawer: () => void;
    closeDrawer: () => void;
    open: boolean;
}

export default function Navigation({navData, drawerWidth, openDrawer, closeDrawer, open}: NavigationProps) {
    const [leftDirection, setDirection] = React.useState(false);
    const containerRef = React.useRef(null);


    React.useEffect(() => {
        setDirection(Math.floor( Math.random() * 2 ) + 1 == 2 ? true : false)
    },
    [open]);

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
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

    const ImageContainer = styled('div', { shouldForwardProp: (prop) => prop !== 'drawerWidth' })
    <ImageProps>(({ drawerWidth }) => ({
        position: 'absolute',
        top: '0px',
        right: '0px',
        height: '100%',
        backgroundColor: 'black',
        width: `calc(100% - ${drawerWidth}px)`,
        opacity: '.8',
    }));

    const Circle = styled('div', {
        shouldForwardProp: (prop) => prop !== 'isPrimary',
    })<{ isPrimary?: boolean }>(({ theme, isPrimary }) => ({
        backgroundColor: isPrimary ? theme.palette.primary.main : theme.palette.background.paper,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        height: 'fit-content',
        padding: '5px'
    }));

    const navListProps = {
        drawerWidth: drawerWidth,
        open: open,
        closeDrawer: closeDrawer,
        navlistItems: navData.data
    } as NavigationListProps;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar ref={containerRef} sx={{
                    backgroundColor: 'background.paper',
                    width: '100%'
                }}>
                    <Slide in={!open} direction="left" container={containerRef.current} unmountOnExit>
                        <Box className={Styles.navbar}>
                            <Link href="https://twitter.com/TheGrammyBread">
                                <Fab color="primary" aria-label="add" size="medium">
                                    <Twitter></Twitter>
                                </Fab>
                            </Link>
                            <Box className={Styles.logoContainer}>
                                <Circle className={Styles.logoCircle} {...{ isPrimary: false }}>
                                    <Button className={Styles.logoButton} onClick={openDrawer}>
                                        <Image priority={true} src='/assets/Only1Logo.svg' layout='fill' />
                                    </Button>
                                </Circle>
                            </Box>
                            <Link href="https://www.instagram.com/thegrammybread/">
                                <Fab color="primary" aria-label="add" size="medium">
                                        <Instagram></Instagram>
                                </Fab>
                            </Link>
                        </Box>
                    </Slide>
                </Toolbar>
            </AppBar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <NavigationList {...navListProps}>
                </NavigationList>
                <ImageContainer drawerWidth={drawerWidth}>
                    <Image src={navData.logo.url} layout='fill' objectFit='cover' objectPosition={leftDirection ? 'left' : 'right'}  />
                </ImageContainer>
            </Backdrop>
        </Box >
    );
}
