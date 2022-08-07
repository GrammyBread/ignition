import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { TableOfContentsPart } from '../../interfaces/view-data.interfaces';
import { Part } from '../../interfaces/read-metadata.interfaces';
import { List, ListItem, Paper } from '@mui/material';
import { mapTOCChaptersAvailability } from '../../mappers/availability.mapper';
import TOCChapter from '../TOCChapter/TOCChapter';

export interface TOCProps {
    data: TableOfContentsPart;
    partDetails: Part;
}

export default function TableOfContents(props: TOCProps) {
    let availability = mapTOCChaptersAvailability(props);

  return (
    <>
        <Paper sx={{color: 'primary.main'}} elevation={0}>
            <List>
                <ListItem>
                    <ListItemText primary={props.partDetails.title}/>
                </ListItem>
                <List sx={{ pl: 4 }} >
                    { availability && availability.map((chapter) => (
                        <TOCChapter {...chapter}></TOCChapter>
                    ))}
                </List>
            </List>
        </Paper>
    </>
  )
};