import * as React from 'react';
import { Section } from '../../../../interfaces/read/view-data.interfaces';
import {
  ListItemButton,
  ListItemText
} from '@mui/material';


export default function NavigationSectionItem(props: Section) {
  return (
    <>
      <ListItemButton sx={{ pl: 15 }}>
        <ListItemText
        primary={props.header} />
      </ListItemButton>
    </>
  )
};