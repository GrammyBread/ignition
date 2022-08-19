

import * as React from 'react';
import { styled } from '@mui/material/styles';
import NavigationPartItem from './NavigationPart';
import
{
    ExpandLess,
    ExpandMore,
    ChevronLeft,
    HomeOutlined,
    MenuBook
} from '@mui/icons-material';
import
{
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

export interface NavigationListProps
{
    drawerWidth: number;
    open: boolean;
    closeDrawer: () => {};
    navlistItems: Story;
}

const DrawerSection = styled( List )( ( { theme } ) => ( {
    color: theme.palette.text.secondary
} ) );

const DrawerHeader = styled( 'div' )( ( { theme } ) => ( {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing( 1, 1 ),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    color: theme.palette.text.primary
} ) );

export default function NavigationList ( props: NavigationListProps )
{
    const [ readOpen, setReadOpen ] = React.useState( false );

    const handleClick = () =>
    {
        setReadOpen( !readOpen );
    };

    return (
        <Drawer
            sx={ {
                width: props.drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: props.drawerWidth,
                    boxSizing: 'border-box',
                },
            } }
            variant="persistent"
            anchor="left"
            open={ props.open }
        >
            <DrawerHeader>
                <Typography variant="h5" component={ "h3" } sx={ { textAlign: 'left' } }>Only One Way To Burn It Down</Typography>
                <ChevronLeft onClick={ props.closeDrawer }></ChevronLeft>
            </DrawerHeader>
            <Divider />
            <DrawerSection sx={ {
                color: 'text.secondary'
            } }>
                <ListItemButton onClick={ handleClick }>
                    {NavigationText("Read", )}
                    <ListItemText primary="Read" />
                    { readOpen ? <ExpandLess /> : <ExpandMore /> }
                </ListItemButton>
                <Collapse in={ readOpen } timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        { props.navlistItems?.parts && props.navlistItems.parts.map( ( part ) => (
                            <div key={ part.key } >
                                <NavigationPartItem { ...part }></NavigationPartItem>
                            </div>
                        ) ) }
                    </List>
                </Collapse>
            </DrawerSection>
            <Divider />
            <DrawerSection>
                <ListItem key={ 'Home' } disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeOutlined></HomeOutlined>
                        </ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItemButton>
                </ListItem>
                <ListItem key={ 'Lore' } disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MenuBook></MenuBook>
                        </ListItemIcon>
                        <ListItemText primary='Lore' />
                    </ListItemButton>
                </ListItem>
            </DrawerSection>
        </Drawer>
    );
}