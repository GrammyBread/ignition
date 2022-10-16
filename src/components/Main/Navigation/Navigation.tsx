import * as React from 'react';
import Styles from './Navigation.module.scss';
import Image from 'next/image';
import {
    Slide,
    Toolbar,
    Backdrop,
    Button,
    Box,
    CssBaseline,
    ListItemText
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import Link from 'next/link';
import NavigationList from './NavigationList/NavigationList';
import { NavigationListProps } from './NavigationList/NavigationList';
import { CleanedNavigation } from '../../../interfaces/read/cleaned-types.interface';
import { Circle } from '../../TableOfContents/helper';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { ParsedUrlQuery } from 'querystring';
import { AppBar, ImageContainer } from './NavigationHelper';
import { NavigationLeft } from './NavigationLeft';
import { NavigationRight } from './NavigationRight';

export interface RelatedScript {
    params: ParsedUrlQuery;
    isIntro: boolean;
}

export interface NavigationProps {
    navData: CleanedNavigation;
    drawerWidth: number;
    openDrawer: () => void;
    closeDrawer: () => void;
    open: boolean;
    nextScript?: RelatedScript;
    previousScript?: RelatedScript;
}

export function Navigation(props: NavigationProps) {
    const [leftDirection, setDirection] = React.useState(false);
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        setDirection(Math.floor(Math.random() * 2) + 1 == 2 ? true : false);
    },
        [props.open]);

    const navListProps = {
        drawerWidth: props.drawerWidth,
        open: props.open,
        closeDrawer: props.closeDrawer,
        navlistItems: props.navData.data
    } as NavigationListProps;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={props.open}
                drawerWidth={props.drawerWidth}
                sx={{
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
                            <NavigationLeft script={props.previousScript} />
                            <Box className={Styles.logoContainer}>
                                <Circle className={Styles.logoCircle} {...{ isPrimary: false }}>
                                    <Button className={Styles.logoButton} onClick={props.openDrawer}>
                                        <Image priority={true} alt="Site Logo" src='/assets/Only1Logo.svg' layout='fill' />
                                    </Button>
                                </Circle>
                            </Box>
                            <NavigationRight script={props.nextScript} />
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
                    <Image src={props.navData.logoUrl} alt="" layout='fill' objectFit='cover' objectPosition={leftDirection ? 'left' : 'right'} />
                </ImageContainer>
            </Backdrop>
        </Box >
    );
}