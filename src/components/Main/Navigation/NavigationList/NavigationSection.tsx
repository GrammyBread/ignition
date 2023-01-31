import * as React from 'react';
import {
  ListItemButton,
  ListItemText
} from '@mui/material';
import { NavItem } from '../../../../interfaces/read/nav-data.interfaces';
import Link from 'next/link';


export default function NavigationSectionItem(props: NavItem) {
  return (
    <Link href={props.isPatreonOnly ? "/patreon" : {
      pathname: props.slug.pathname,
      query: props.slug.params
    }}>
      <ListItemButton sx={{ pl: 15 }}>
        <ListItemText
          primary={props.title} />
      </ListItemButton>
    </Link>
  )
};