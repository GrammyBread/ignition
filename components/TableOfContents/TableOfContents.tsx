import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { ChapterAvailability, TableOfContentsChapter, TableOfContentsPart } from '../../interfaces/view-data.interfaces';
import { Chapter, Part } from '../../interfaces/read-metadata.interfaces';
import { List, ListItem, Paper } from '@mui/material';
import TOCChapter from '../TOCChapter/TOCChapter';
import Styles from './TableOfContents.module.scss';
import TOCPart from '../TOCPart/TOCPart';

export interface TOCPartProps
{
    partData: TableOfContentsPart;
    partDetails: Part;
}

export interface TOCChapterProps
{
    availability?: ChapterAvailability;
    cosmicProps?: TOCChapterCosmicProps;
}

export interface TOCChapterCosmicProps
{
    chapterData: TableOfContentsChapter;
    chapterDetails: Chapter;
}

export interface TableOfContentsProps
{
    partProps?: TOCPartProps;
    chapterProps?: TOCChapterProps;
}


export default function TableOfContents ( props: TableOfContentsProps )
{
    return (
        <>
            <Paper className={ Styles.contents } elevation={ 0 }>
                { props.partProps != undefined &&
                    <TOCPart { ...props.partProps }></TOCPart>
                }
                { props.chapterProps != undefined &&
                    <TOCChapter { ...props.chapterProps }></TOCChapter>
                }
            </Paper>
        </>
    );
};