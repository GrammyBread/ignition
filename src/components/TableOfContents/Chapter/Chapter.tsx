import * as React from 'react';
import { useTheme, Paper, Divider, Chip } from '@mui/material';
import { NavigationChapter } from '../../../interfaces/read/nav-data.interfaces';
import { TableOfContentsLogline } from '../Logline';
import { ChapterSectionList } from './ChapterSectionList';
import { ChapterHeaderText } from './ChapterHeaderText';
import { ChapterStack } from './ChapterStack';

interface ContentChapterProps {
    content: NavigationChapter;
    logline?: string;
}


export function ContentChapter({ content, logline }: ContentChapterProps): JSX.Element {
    const theme = useTheme();
    let availability = content.status;

    if (availability == undefined) {
        throw new Error('Availability was wrong!');
    }

    const header = <ChapterHeaderText
        status={availability}
        header={content.title}
        isChapterPage={!!logline}
        slug={content.slug} />
    const sectionList = <ChapterSectionList content={content} />

    return logline ?
        <ChapterStack isChapterPage={!!logline}>
            <Paper>
                {header}
                {
                    logline &&
                    <TableOfContentsLogline text={logline} />
                }
            </Paper >
            <Paper>
                <Divider variant='middle' sx={{pt: 3}}><Chip label="SECTIONS"/></Divider>
                {sectionList}
            </Paper>
        </ChapterStack>
        :
        <ChapterStack isChapterPage={!!logline}>
            <div>
                {header}
                {logline &&
                    <TableOfContentsLogline text={logline} />
                }
            </div>
            <div>
                {sectionList}
            </div>
        </ChapterStack>
}