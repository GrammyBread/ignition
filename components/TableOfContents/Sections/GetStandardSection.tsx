import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { ListItem } from '@mui/material';
import { Section } from '../../../interfaces/view-data.interfaces';
import { getLinkedTitle } from '../helper';

export const getStandardSection = ( isPublished: boolean, availability: Section) =>
{
    return (
        <ListItem
            key={ availability.key }
            sx={ { color: isPublished ? 'inherit' : 'text.disabled' } }>
                {isPublished ? 
                    getLinkedTitle(availability.publishStatus, availability.header, availability.itemSlug)
                    :
                    <ListItemText primary={ availability.header } />
                }
        </ListItem>
    );
};
