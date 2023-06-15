import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { Divider, List, ListItem, Paper, Stack, Typography, styled } from '@mui/material';
import { ContentChapter } from '../Chapter/Chapter';
import { NavigationPart } from '../../../interfaces/read/nav-data.interfaces';
import { TableOfContentsLogline } from '../Logline';

interface ContentPartProps {
    content: NavigationPart;
    logline: string;
}


export const ContentPart = ({ content, logline }: ContentPartProps): JSX.Element =>
(
    <Stack spacing={2}>
        <Paper>
            <ListItem>
                <ListItemText primary={
                    <Typography align="center" variant="h3" component="h1" sx={{
                        textDecoration: 'underline',
                        mb: 0
                    }}>
                        {content.title}
                    </Typography>
                } />
            </ListItem>
            {logline &&
                <TableOfContentsLogline text={logline} />
            }
        </Paper>
        <Paper>
            <List sx={{ pl: 1, pr: 1 }} >
                {content.chapters.map((chapter) => {
                    return (
                        <ContentChapter content={chapter} key={chapter.key} />
                    );
                })}
            </List>
        </Paper>
    </Stack>
);