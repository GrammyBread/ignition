import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { List, ListItem, Typography } from '@mui/material';
import { ContentChapter } from '../Chapter/Chapter';
import { NavigationPart } from '../../../interfaces/read/nav-data.interfaces';

export const ContentPart = (props: NavigationPart): JSX.Element =>
(
    <List>
        <ListItem>
            <ListItemText primary={
                <Typography align="center" variant="h3" component="h1" sx={{
                    textDecoration: 'underline'
                }}>
                    {props.title}
                </Typography>
            } />
        </ListItem>
        <List sx={{ pl: 2 }} >
            {props.chapters.map((chapter) => {
                return (
                    <ContentChapter {...chapter} key={chapter.key} />
                );
            })}
        </List>
    </List>
);