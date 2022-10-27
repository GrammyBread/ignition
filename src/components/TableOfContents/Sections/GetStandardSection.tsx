import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { ListItem } from '@mui/material';
import { Section } from '../../../interfaces/read/view-data.interfaces';
import { getLinkedSectionTitle } from '../helper';
import { NORMAL_SECTION_PATH } from '../../../mappers/pathname.mapper';

export const getStandardSection = ( isPublished: boolean, availability: Section) =>
{
    return (
        <ListItem
            key={ availability.key }
            sx={ { color: isPublished ? 'inherit' : 'text.disabled' } }>
                {isPublished && availability.fullPath ? 
                    getLinkedSectionTitle(availability.publishStatus, availability.header, {
                        query: availability.fullPath,
                        pathname: NORMAL_SECTION_PATH
                    })
                    :
                    <ListItemText primary={ availability.header } />
                }
        </ListItem>
    );
};
