import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { List, ListItem, Typography } from '@mui/material';
import { ContentChapter } from '../Chapter/Chapter';
import { NavigationPart } from '../../../interfaces/read/nav-data.interfaces';

interface ContentPartProps {
    content: NavigationPart;
    logline: string;
}

export const ContentPart = ({ content, logline }: ContentPartProps): JSX.Element =>
(
    <List>
        <div>
            <ListItem>
                <ListItemText primary={
                    <Typography align="center" variant="h3" component="h1" sx={{
                        textDecoration: 'underline'
                    }}>
                        {content.title}
                    </Typography>
                } />
            </ListItem>
            <Typography variant='body1' component='div' dangerouslySetInnerHTML={{ __html: logline }} />
        </div>
        <List sx={{ pl: 2 }} >
            {content.chapters.map((chapter) => {
                return (
                    <ContentChapter content={chapter} key={chapter.key} />
                );
            })}
        </List>
    </List>
);