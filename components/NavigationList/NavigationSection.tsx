import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavigationLink } from './NavigationList';


export default function NavigationSectionItem(props: NavigationLink) {
  return (
    <>
      <ListItemButton sx={{ pl: 15 }}>
        <ListItemText
        primary={props.title} />
      </ListItemButton>
    </>
  )
};