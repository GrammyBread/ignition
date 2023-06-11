import * as React from 'react';
import { Paper, styled } from '@mui/material';
import { ContentChapter } from '../Chapter/Chapter';
import Styles from './Table.module.scss';
import { ContentPart } from '../Part/Part';
import { ErrorPage } from '../../Error/Error';
import { NavigationPart, NavigationChapter } from '../../../interfaces/read/nav-data.interfaces';

export interface TableOfContentsProps {
    partProps?: {
        content: NavigationPart;
        logline: string;
    };
    chapterProps?: {
        content:  NavigationChapter;
        logline?: string;
    };
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

export default function TableOfContents({ partProps, chapterProps }: TableOfContentsProps) {
    let tableContents: JSX.Element | undefined = undefined;
    if (partProps) {
        tableContents = <ContentPart content={partProps.content} logline={partProps.logline}></ContentPart>;
    } else if (chapterProps) {
        tableContents = <ContentChapter content={chapterProps.content} logline={chapterProps.logline}></ContentChapter>;
    }

    return tableContents != undefined ?
        <Table className={Styles.contents} elevation={0} >
            {tableContents}
        </Table >
        :
        <ErrorPage message="We can't seem to find what you're looking for 🤔?" />;
};