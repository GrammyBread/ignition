import * as React from 'react';
import { ChapterAvailability, TableOfContentsChapter, TableOfContentsPart } from '../../interfaces/view-data.interfaces';
import { Chapter, Part } from '../../interfaces/read-metadata.interfaces';
import { Paper } from '@mui/material';
import Image from 'next/image';
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
    let tableChild;
    if ( props.partProps != undefined )
    {
        tableChild = <TOCPart { ...props.partProps }></TOCPart>;
    }
    else if ( props.chapterProps != undefined )
    {
        tableChild = <TOCChapter { ...props.chapterProps }></TOCChapter>;
    }

    return (
        <Paper className={ Styles.contents } elevation={ 0 }>
            { tableChild }
        </Paper>
    );
};