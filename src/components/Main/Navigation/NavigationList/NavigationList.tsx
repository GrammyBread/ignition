

import * as React from 'react';
import { styled } from '@mui/material/styles';
import NavigationPartItem from './NavigationPart';
import {
    ChevronLeft,
    ExpandLess,
    HomeOutlined,
    MenuBook,
    NoEncryption
} from '@mui/icons-material';
import {
    Collapse,
    Drawer,
    List,
    Typography,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavPart } from '../../../../interfaces/read/nav-data.interfaces';
import { ExpandMore } from '@mui/icons-material';
import Styles from "../Navigation.module.scss";

export interface NavigationListProps {
    drawerWidth: number;
    open: boolean;
    closeDrawer: () => {};
    navlistItems: NavPart[];
}

const DrawerSection = styled(List)(({ theme }) => ({
    color: theme.palette.text.secondary
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    color: theme.palette.text.primary
}));

export default function NavigationList(props: NavigationListProps) {
    const router = useRouter()
    const [readOpen, setReadOpen] = React.useState(false);
    const [lastClickTime, setLastClickTime] = React.useState(Date.now() - 1000);

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        const dif = Date.now() - lastClickTime;
        if (dif < 500) {
            router.push('/read');
        }
        else {
            setReadOpen(!readOpen);
            setLastClickTime(Date.now())
        }
        event.stopPropagation();
    };

    return (
        <Drawer
            sx={{
                width: props.drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: props.drawerWidth,
                    boxSizing: 'border-box',
                },
                '& a': {
                    textDecoration: 'none',
                    color: 'text.primary'
                }
            }}
            variant="persistent"
            anchor="left"
            open={props.open}
        >
            <DrawerHeader>
                <Typography variant="h5" component={"h3"} sx={{ textAlign: 'left' }}>Only One Way To Burn It Down</Typography>
                <ChevronLeft onClick={props.closeDrawer}></ChevronLeft>
            </DrawerHeader>
            <Divider />
            <DrawerSection sx={{
                color: 'text.secondary'
            }}>
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={"Read"} />
                    {readOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={readOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {props.navlistItems && props.navlistItems.map((part) => (
                            <div key={part.key} >
                                <NavigationPartItem {...part}></NavigationPartItem>
                            </div>
                        ))}
                    </List>
                </Collapse>
            </DrawerSection>
            <Divider />
            <DrawerSection>
                <List>
                    <ListItem key={'Home'} disablePadding>
                        <Link href="/">
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeOutlined></HomeOutlined>
                                </ListItemIcon>
                                <ListItemText primary='Home' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem key={'Lore'} disablePadding>
                        <Link href="/appendices">
                            <ListItemButton>
                                <ListItemIcon>
                                    <MenuBook></MenuBook>
                                </ListItemIcon>
                                <ListItemText primary='Lore' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
            </DrawerSection>
        </Drawer>
    );
}