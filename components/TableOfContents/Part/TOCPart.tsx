import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { List, ListItem, Typography } from '@mui/material';
import { mapTOCPartAvailability } from '../../../mappers/availability/availability.mapper';
import { TOCChapterProps, TOCPartProps } from '../Table/Table';
import TOCChapter from '../Chapter/TOCChapter';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../Error/Error';
import { ChapterAvailability } from '../../../interfaces/view-data.interfaces';

interface PartProps {
    availability: ChapterAvailability[] | undefined;
    title: string;
    slug: string;
}

function Part(props: PartProps) {
    if (props.availability == undefined) {
        throw new Error("Part availability was not defined!")
    }

    return (
        <List>
            <ListItem>
                <ListItemText primary={
                        <Typography align="center" variant="h4" sx={{
                            textDecoration: 'underline'
                        }}>
                            {props.title}
                        </Typography>
                    }/>
            </ListItem>
            <List sx={{ pl: 2 }} >
                {props.availability && props.availability.map((chapter) => {
                    let chapterProps = {
                        availability: chapter,
                        partSlug: props.slug
                    } as TOCChapterProps;
                    return (
                        <div key={chapter.key}>
                            <TOCChapter {...chapterProps}></TOCChapter>
                        </div>
                    );
                })}
            </List>
        </List>
    );
}

export default function TOCPart(props: TOCPartProps) {
    let availability = mapTOCPartAvailability(props);

    let partProps = {
        availability,
        title: props.partDetails.title,
        slug: props.partDetails.slug
    } as PartProps;

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Part {...partProps}></Part>
        </ErrorBoundary>
    );
};