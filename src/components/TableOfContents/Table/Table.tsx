import * as React from 'react';
import { Paper, styled } from '@mui/material';
import { ContentChapter } from '../Chapter/Chapter';
import Styles from './Table.module.scss';
import { ContentPart } from '../Part/Part';
import { ErrorPage } from '../../Error/Error';
import { NavigationPart, NavigationChapter } from '../../../interfaces/read/nav-data.interfaces';

export interface TableOfContentsProps {
    partProps?: NavigationPart;
    chapterProps?: NavigationChapter;
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
    if (partProps) {
        return <ContentPart {...partProps}></ContentPart>;
    }

    if (chapterProps) {
        return <ContentChapter {...chapterProps}></ContentChapter>;
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
        <ErrorPage message="We can't seem to find what you're looking for 🤔?" />;
};