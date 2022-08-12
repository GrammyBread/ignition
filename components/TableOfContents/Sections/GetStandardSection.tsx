import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { SectionAvailability } from '../../../interfaces/view-data.interfaces';
import { ListItem } from '@mui/material';
import getLinkedTOCTitle from '../helper';

export const getStandardSection = ( isPublished: boolean, availability: SectionAvailability, slug?: string ) =>
{
    return (
        <ListItem
            key={ availability.key }
            sx={ { color: isPublished ? 'inherit' : 'text.disabled' } }>
                {isPublished ? 
                    getLinkedTOCTitle(availability.publishStatus, availability.header, slug)
                    :
                    <ListItemText primary={ availability.header } />
                }
        </ListItem>
    );
};
