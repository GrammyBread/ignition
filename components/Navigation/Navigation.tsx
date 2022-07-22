import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Styles from './Navigation.module.scss';
import Image from 'next/image';
import {
    ButtonBase,
    Slide,
    Toolbar,
    Backdrop,
    Button,
    Box,
    CssBaseline,
    Fab
} from '@mui/material';
import { Twitter, Instagram } from '@mui/icons-material';
import Link from 'next/link';
import NavigationList from '../NavigationList/NavigationList';
import { NavigationListProps } from '../NavigationList/NavigationList';
import { NavigationData } from '../../interfaces/read-metadata.interfaces';
import MapNavigation from '../../mappers/navigation.mapper';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export default function Navigation(props: NavigationData) {
    const containerRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navlistData = MapNavigation(props);

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${props.navWidth}px)`,
            marginLeft: `${props.navWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            })
        }),
    }));

    const ImageContainer = styled('div')(({ theme }) => ({
        position: 'absolute',
        top: '0px',
        right: '-20px',
        height: '100%',
        width: 'auto',
        opacity: '.8',
        aspectRatio: '29/40'
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
        drawerWidth: props.navWidth,
        open: open,
        closeDrawer: handleDrawerClose,
        navlistItems: navlistData
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
                                    <Button className={Styles.logoButton} onClick={handleDrawerOpen}>
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
                <ImageContainer>
                    <Image className='imageContainer' src={props.metadata.logo.url} layout='fill' />
                </ImageContainer>
            </Backdrop>
        </Box >
    );
}
