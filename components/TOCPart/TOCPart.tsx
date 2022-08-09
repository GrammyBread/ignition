import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { List, ListItem, Paper } from '@mui/material';
import {mapTOCPartAvailability } from '../../mappers/availability.mapper';
import { TOCPartProps } from '../TableOfContents/TableOfContents';
import TOCChapter from '../TOCChapter/TOCChapter';


export default function TOCPart ( props: TOCPartProps)
{
    let availability = mapTOCPartAvailability(props);

    if(availability == undefined) {
        throw new Error();
    }

    return (
        <>
            <List>
                <ListItem>
                    <ListItemText primary={ props.partDetails.title } />
                </ListItem>
                <List sx={ { pl: 4 } } >
                    { availability && availability.map( ( chapter ) => {
                        return <TOCChapter {...availability} key={ chapter.key }></TOCChapter>;
                    }) }
                </List>
            </List>
        </>
    );
};