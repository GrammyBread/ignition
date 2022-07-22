
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { HomeOutlined, MenuBook } from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import NavigationPartItem, { NavPartProps } from './NavigationPart';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

export interface NavigationLink {
    slug: string;
    title: string;
}

export interface NavigationList {
    parts: NavPartProps[];
}

export interface NavigationListProps {
    drawerWidth: number;
    open: boolean;
    closeDrawer: () => {};
    navlistItems: NavigationList;
}

const DrawerSection = styled(List)(({theme}) => ({
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
    const [readOpen, setReadOpen] = React.useState(false);

    const handleClick = () => {
        setReadOpen(!readOpen);
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
                <Typography variant="h4" sx={{ textAlign: 'left' }}>Only One Way To Burn It Down</Typography>
                <ChevronLeftIcon onClick={props.closeDrawer}></ChevronLeftIcon>
            </DrawerHeader>
            <Divider />
            <DrawerSection sx={{
                color: 'text.secondary'
            }}>
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary="Read" />
                    {readOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={readOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {props.navlistItems?.parts && props.navlistItems.parts.map((part) => (
                            <NavigationPartItem key={part.link.slug} {...part}></NavigationPartItem>
                        ))}                        
                    </List>
                </Collapse>
            </DrawerSection>
            <Divider />
            <DrawerSection>                
                    <ListItem key={'Home'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeOutlined></HomeOutlined>
                            </ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'Lore'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <MenuBook></MenuBook>
                            </ListItemIcon>
                            <ListItemText primary='Lore' />
                        </ListItemButton>
                    </ListItem>
            </DrawerSection>
        </Drawer>
    )
}