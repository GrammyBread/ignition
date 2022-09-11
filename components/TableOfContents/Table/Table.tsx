import * as React from 'react';
import { Paper, styled } from '@mui/material';
import { ChapterProps, TOCChapter } from '../Chapter/TOCChapter';
import Styles from './Table.module.scss';
import { TOCPart } from '../Part/TOCPart';
import { Part } from '../../../interfaces/read/view-data.interfaces';
import { CustomErrorPage } from '../../Error/Error';

export interface TableOfContentsProps {
    partProps?: Part;
    chapterProps?: ChapterProps;
}

export const Table = styled(Paper)(({ theme }) => ({
    margin: 'auto',
    padding: theme.spacing(1),
    [theme.breakpoints.between('xs', 'sm')]: {
        width: '100%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
        width: '80%'
    },
    [theme.breakpoints.between('md', 'lg')]: {
        width: '60%'
    },
    [theme.breakpoints.between('lg', 'xl')]: {
        width: '50%'
    },
    [theme.breakpoints.up('xl')]: {
        width: '40%'
    }
}));

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
        <Table className={Styles.contents} elevation={0} >
            {tableChild}
        </Table >
        :
        <CustomErrorPage message="We can't seem to find what you're looking for 🤔?" />;
};