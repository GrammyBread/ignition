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
AppBarProps as MuiAppBarProps,
ListItemText
} from '@mui/material';
import { Twitter, Instagram, NavigateNext, NavigateBefore, ExpandMore } from '@mui/icons-material';
import Link from 'next/link';
import NavigationList from './NavigationList/NavigationList';
import { NavigationListProps } from './NavigationList/NavigationList';
import { CleanedNavigation } from '../../../interfaces/read/cleaned-types.interface';
import { Circle } from '../../TableOfContents/helper';
import { Section } from '../../../interfaces/read/view-data.interfaces';
import ExpandLess from '@mui/icons-material/ExpandLess';

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
    nextSection?: Section;
    previousSection?: Section;
}

export function NavigationText(header: string, slug?: string, open?: boolean): JSX.Element {
    const link = <ListItemText primary={header} sx={{
        lineClamp: '1',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: slug != undefined ? 'text.disabled' : 'inherit'
    }} />;

    return (
        <React.Fragment>
            {
                slug != undefined ?
                    <Link href={slug}>{link}</Link> : link
            }
            {
                open != undefined &&
                    open ? <ExpandLess /> : <ExpandMore />
            }
        </React.Fragment>
    );
}

export function Navigation(props: NavigationProps) {
    const [leftDirection, setDirection] = React.useState(false);
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        setDirection(Math.floor(Math.random() * 2) + 1 == 2 ? true : false);
    },
        [props.open]);

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${props.drawerWidth}px)`,
            marginLeft: `${props.drawerWidth}px`,
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
            width: `calc(100% - ${drawerWidth}px)`,
        }));

    const navListProps = {
        drawerWidth: props.drawerWidth,
        open: props.open,
        closeDrawer: props.closeDrawer,
        navlistItems: props.navData.data
    } as NavigationListProps;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={props.open} sx={{
                backgroundColor: 'error.main'
            }}>
                <Toolbar ref={containerRef} sx={{
                    backgroundColor: 'error.main',
                    borderBottom: '.5rem solid',
                    borderColor: 'background.paper',
                    width: '100%'
                }}>
                    <Slide in={!props.open} direction="left" container={containerRef.current} unmountOnExit>
                        <Box className={Styles.navbar}>
                            {
                                props.previousSection && props.previousSection.itemSlug ?
                                    <Link href={props.previousSection.itemSlug}>
                                        <Fab color="primary" aria-label="add" size="medium">
                                            <NavigateBefore></NavigateBefore>
                                        </Fab>
                                        Previous Section
                                    </Link>
                                    :
                                    <Link href="https://twitter.com/TheGrammyBread">
                                        <Fab color="primary" aria-label="add" size="medium">
                                            <Twitter></Twitter>
                                        </Fab>
                                    </Link>
                            }

                            <Box className={Styles.logoContainer}>
                                <Circle className={Styles.logoCircle} {...{ isPrimary: false }}>
                                    <Button className={Styles.logoButton} onClick={props.openDrawer}>
                                        <Image priority={true} src='/assets/Only1Logo.svg' layout='fill' />
                                    </Button>
                                </Circle>
                            </Box>
                            {
                                props.nextSection && props.nextSection.itemSlug ?
                                    <Link href={props.nextSection.itemSlug}>
                                        Forward Section
                                        <Fab color="primary" aria-label="add" size="medium">
                                            <NavigateNext></NavigateNext>
                                        </Fab>
                                    </Link>
                                    :
                                    <Link href="https://www.instagram.com/thegrammybread/">
                                        <Fab color="primary" aria-label="add" size="medium">
                                            <Instagram></Instagram>
                                        </Fab>
                                    </Link>
                            }
                        </Box>
                    </Slide>
                </Toolbar>
            </AppBar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.open}
            >
                <NavigationList {...navListProps}>
                </NavigationList>
                <ImageContainer drawerWidth={props.drawerWidth}>
                    <Image src={props.navData.logo.url} layout='fill' objectFit='cover' objectPosition={leftDirection ? 'left' : 'right'} />
                </ImageContainer>
            </Backdrop>
        </Box >
    );
}
