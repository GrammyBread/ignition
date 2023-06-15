import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { ListItem } from '@mui/material';
import { AnimatedLink, getLinkedSectionTitle } from '../../helper';
import { NORMAL_SECTION_PATH } from '../../../../mappers/pathname.mapper';
import { NavigationItem } from '../../../../interfaces/read/nav-data.interfaces';
import { ParsedUrlQuery } from 'querystring';

export const StandardSection = (isPublished: boolean, section: NavigationItem): JSX.Element =>
(
    <ListItem
        key={section.key}
        sx={{ color: isPublished ? 'inherit' : 'text.disabled' }}>
        {isPublished && section.slug ?
            <AnimatedLink href={{
                query: section.slug as ParsedUrlQuery,
                pathname: NORMAL_SECTION_PATH
            }} >
                {section.title}
            </AnimatedLink>
            :
            <ListItemText primary={section.title} />
        }
    </ListItem>
);
