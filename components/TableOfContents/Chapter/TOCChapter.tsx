import * as React from 'react';
import { List, ListItem } from '@mui/material';
import getSection from '../Sections/shared';
import { getLinkedTitle, getUnlikedTitle } from '../helper';
import { Chapter } from '../../../interfaces/view-data.interfaces';

export interface ChapterProps {
    showLinkedHeader: boolean;
    availability: Chapter;
}

export function TOCChapter(props: ChapterProps): JSX.Element {
    let availability = props.availability;

    if (availability == undefined) {
        throw new Error('Availability was wrong!');
    }

    return (
        <>
            <ListItem>
                {props.showLinkedHeader ?
                    getLinkedTitle(availability.publishStatus, availability.header, availability?.itemSlug)
                    :
                    getUnlikedTitle(availability.header)
                }
            </ListItem>
            <List sx={{ pl: 6 }}>
                {availability.sections && availability.sections.map((section) => getSection(section))}
            </List>
        </>
    );
}