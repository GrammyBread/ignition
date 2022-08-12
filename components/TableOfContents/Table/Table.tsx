import * as React from 'react';
import { ChapterAvailability, TableOfContentsChapter, TableOfContentsPart } from '../../../interfaces/view-data.interfaces';
import { CosmicChapter, CosmicPart } from '../../../interfaces/read-metadata.interfaces';
import { Paper } from '@mui/material';
import TOCChapter from '../Chapter/TOCChapter';
import Styles from './Table.module.scss';
import TOCPart from '../Part/TOCPart';

export interface TOCPartProps
{
    partData: TableOfContentsPart;
    partDetails: CosmicPart;
}

export interface TOCChapterProps
{
    availability?: ChapterAvailability;
    cosmicProps?: TOCChapterCosmicProps;
    partSlug: string;
}

export interface TOCChapterCosmicProps
{
    chapterData: TableOfContentsChapter;
    chapterDetails: CosmicChapter;
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