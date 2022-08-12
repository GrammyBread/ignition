import * as React from 'react';
import { ChapterAvailability } from '../../../interfaces/view-data.interfaces';
import { List, ListItem } from '@mui/material';
import { TOCChapterProps } from '../Table/Table';
import { mapTOCChapterAvailability } from '../../../mappers/availability/availability.mapper';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../Error/Error';
import getSection from '../Sections/shared';
import getLinkedTOCTitle from '../helper';

interface ChapterProps {
    availability?: ChapterAvailability;
    chapterSlug?: string;
}


function Chapter(props: ChapterProps): JSX.Element {
    if (props.availability == undefined) {
        throw new Error('Availability was wrong!');
    }

    let data = props.availability;

    return (
        <>
            <ListItem>
                {getLinkedTOCTitle(data.publishStatus, data.header, props.chapterSlug)}
            </ListItem>
            <List sx={{ pl: 6 }}>
                {data.sections && data.sections.map((section) => getSection(section, props.chapterSlug))}
            </List>
        </>
    );
}

export default function TOCChapter(props: TOCChapterProps) {
    let availability = props.availability == undefined && props.cosmicProps != undefined ?
        mapTOCChapterAvailability(props.cosmicProps) : props.availability;

    let chapterProps = {
        availability,
        chapterSlug: `/read/${props.partSlug}/${props.availability?.slug}`
    } as ChapterProps;

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Chapter {...chapterProps}></Chapter>
        </ErrorBoundary>
    );
};