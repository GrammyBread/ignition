

import * as React from 'react';
import { styled } from '@mui/material/styles';
import NavigationPartItem from './NavigationPart';
import {
    ChevronLeft,
    HomeOutlined,
    MenuBook
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
import { Story } from '../../../../interfaces/read/view-data.interfaces';
import Link from 'next/link';
import { NavigationText } from '../Navigation';
import { useRouter } from 'next/router';

export interface NavigationListProps {
    drawerWidth: number;
    open: boolean;
    closeDrawer: () => {};
    navlistItems: Story;
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
        if(dif < 500)
        {
            router.push('/read');
        }
        else
        {
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
                    {NavigationText("Read")}
                </ListItemButton>
                <Collapse in={readOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {props.navlistItems?.parts && props.navlistItems.parts.map((part) => (
                            <div key={part.key} >
                                <NavigationPartItem {...part}></NavigationPartItem>
                            </div>
                        ))}
                    </List>
                </Collapse>
            </DrawerSection>
            <Divider />
            <DrawerSection>
                <ListItem key={'Home'} disablePadding>
                    <Link href="/home">
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
            </DrawerSection>
        </Drawer>
    );
}