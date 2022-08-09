import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { List, ListItem, Paper } from '@mui/material';
import { mapTOCPartAvailability } from '../../mappers/availability.mapper';
import { TOCChapterProps, TOCPartProps } from '../TableOfContents/TableOfContents';
import TOCChapter from '../TOCChapter/TOCChapter';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../Error/Error';
import { ChapterAvailability } from '../../interfaces/view-data.interfaces';
import { PropaneSharp } from '@mui/icons-material';

interface PartProps
{
    availability: ChapterAvailability[] | undefined;
    title: string;
}


function Part (props: PartProps)
{
    if(props.availability == undefined)
    {
        throw new Error("Part availability was not defined!")
    }

    return (
        <List>
            <ListItem>
                <ListItemText primary={ props.title } />
            </ListItem>
            <List sx={ { pl: 4 } } >
                { props.availability && props.availability.map( ( chapter ) =>
                {
                    let chapterProps = {
                        availability: chapter
                    } as TOCChapterProps;
                    return (
                        <div key={ chapter.key }>
                            <TOCChapter { ...chapterProps }></TOCChapter>
                        </div>
                    );
                } ) }
            </List>
        </List>
    );
}

export default function TOCPart ( props: TOCPartProps )
{
    let availability = mapTOCPartAvailability( props );

    let partProps = {
        availability,
        title: props.partDetails.title
    } as PartProps;

    return (
        <ErrorBoundary FallbackComponent={ ErrorFallback }>
            <Part { ...partProps }></Part>
        </ErrorBoundary>
    );
};