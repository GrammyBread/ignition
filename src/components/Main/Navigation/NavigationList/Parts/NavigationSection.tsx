import * as React from 'react';
import {
  ListItemButton,
  ListItemText
} from '@mui/material';
import { NavigationItem, PublishStatus } from '../../../../../interfaces/read/nav-data.interfaces';
import Link from 'next/link';
import { NORMAL_SECTION_PATH } from '../../../../../mappers/pathname.mapper';


export default function NavigationSectionItem(props: NavigationItem) {
  const isAvailable = props.status != PublishStatus.Unpublished;
  const isPatreon = props.status === PublishStatus.PatreonOnly;
  
  const sectionButton = (
    <ListItemButton disabled={!isAvailable} sx={{ pl: 15 }}>
      <ListItemText
        sx={{ color: isPatreon ? 'warning.main' : 'inherit' }}
        primary={props.shortTitle} />
    </ListItemButton>
  );

  
  return !isAvailable ? sectionButton :
    (
      <Link href={isPatreon ? "/patreon" : {
        pathname: NORMAL_SECTION_PATH,
        query: props.slug
      }}>
        {sectionButton}
      </Link>
    )
};