import * as React from 'react';
import { Paper } from '@mui/material';
import { ChapterProps, TOCChapter } from '../Chapter/TOCChapter';
import Styles from './Table.module.scss';
import { TOCPart } from '../Part/TOCPart';
import { Part } from '../../../interfaces/read/view-data.interfaces';
import { CustomErrorPage } from '../../Error/Error';

export interface TableOfContentsProps {
    partProps?: Part;
    chapterProps?: ChapterProps;
}

function DetermineLayoutType({ partProps, chapterProps }: TableOfContentsProps): JSX.Element | undefined {
    if (partProps != undefined) {
        return <TOCPart {...partProps}></TOCPart>;
    }

    if (chapterProps != undefined) {
        return <TOCChapter {...chapterProps}></TOCChapter>;
    }

    return undefined;
}

export default function TableOfContents(props: TableOfContentsProps) {
    const tableChild = DetermineLayoutType(props);

    return tableChild != undefined ?
    <Paper className={Styles.contents} elevation={0} >
        {tableChild}
    </Paper >
    :
    <CustomErrorPage message="We can't seem to find what you're looking for 🤔?"/>;
};