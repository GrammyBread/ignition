import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { List, ListItem, Typography } from '@mui/material';
import { Part } from '../../../interfaces/read/view-data.interfaces';
import { ChapterProps, TOCChapter } from '../Chapter/TOCChapter';

export function TOCPart(props: Part) {
    return (
        <List>
            <ListItem>
                <ListItemText primary={
                        <Typography align="center" variant="h4" component="h2" sx={{
                            textDecoration: 'underline'
                        }}>
                            {props.header}
                        </Typography>
                    }/>
            </ListItem>
            <List sx={{ pl: 2 }} >
                {props.chapters.map((chapter) => {
                    let chapterProps = {
                        showLinkedHeader: true,
                        availability: chapter
                    } as ChapterProps;
                    return (
                        <div key={chapter.key}>
                            <TOCChapter {...chapterProps}></TOCChapter>
                        </div>
                    );
                })}
            </List>
        </List>
    );
}