import * as React from 'react';
import { Container, Paper, styled } from '@mui/material';
import { ContentChapter } from '../Chapter/Chapter';
import { ContentPart } from '../Part/Part';
import { ErrorPage } from '../../Error/Error';
import { NavigationPart, NavigationChapter } from '../../../interfaces/read/nav-data.interfaces';

export interface TableOfContentsProps {
    partProps?: {
        content: NavigationPart;
        logline: string;
    };
    chapterProps?: {
        content: NavigationChapter;
        logline?: string;
    };
}

export default function TableOfContents({ partProps, chapterProps }: TableOfContentsProps) {
    let tableContents: JSX.Element | undefined = undefined;
    if (partProps) {
        tableContents = <ContentPart content={partProps.content} logline={partProps.logline}></ContentPart>;
    } else if (chapterProps) {
        tableContents = <ContentChapter content={chapterProps.content} logline={chapterProps.logline}></ContentChapter>;
    }

    return tableContents != undefined ?
        <Container fixed sx={{
            fontVariant: "petite-caps"
        }}>
            {tableContents}
        </Container >
        :
        <ErrorPage message="We can't seem to find what you're looking for 🤔?" />;
};