import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { ChapterAvailability, SectionAvailability } from '../../interfaces/view-data.interfaces';
import { Badge, List, ListItem } from '@mui/material';
import Styles from './TOCChapter.module.scss';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ItemStatus } from '../../mappers/state.mappers';
import { TOCChapterProps } from '../TableOfContents/TableOfContents';
import { mapTOCChapterAvailability } from '../../mappers/availability.mapper';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../Error/Error';

interface ChapterProps
{
    availability?: ChapterAvailability;
}


const HtmlTooltip = styled( ( { className, ...props }: TooltipProps ) => (
    <Tooltip { ...props } classes={ { popper: className } } placement="right" />
) )( ( { theme } ) => ( {
    [ `& .${ tooltipClasses.tooltip }` ]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem( 12 ),
        border: '1px solid #dadde9',
    },
} ) );

const LightTooltip = styled( ( { className, ...props }: TooltipProps ) => (
    <Tooltip { ...props } classes={ { popper: className } } placement="right" />
) )( ( { theme } ) => ( {
    [ `& .${ tooltipClasses.tooltip }` ]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[ 1 ],
        fontSize: 11,
    },
} ) );

const getPatreonSection = ( availability: SectionAvailability ): JSX.Element =>
{
    let tooltip =
        <React.Fragment>
            <Typography color="inherit">This Section is Patreon Only</Typography>
            <b>{ 'Want to keep reading?' }</b>
            <br />
            { "You can read this section by subscribing on Patreon" }
        </React.Fragment>;

    return (
        <ListItem className={ Styles.patreonOnlySection }>
            <HtmlTooltip title={
                tooltip
            }>
                <Badge color="primary" badgeContent="Patreon Only">
                    <ListItemText sx={ {
                        color: "warning.main"
                    }
                    } className={ Styles.patreonOnlySection } primary={ availability.header } />
                </Badge>
            </HtmlTooltip>
        </ListItem> );
};

const getNewSection = ( availability: SectionAvailability ) =>
{
    return (
        <ListItem className={ Styles.newSection }>
            <LightTooltip title="This is the newest section!">
                <Badge color="secondary" badgeContent="New">
                    <ListItemText primary={ availability.header } />
                </Badge>
            </LightTooltip>
        </ListItem>
    );
};

const getNormalSection = ( isPublished: boolean, availability: SectionAvailability ) =>
{
    return (
        <ListItem
            key={ availability.key }
            sx={ { color: isPublished ? 'inherit' : 'text.disabled' } }>
            <ListItemText primary={ availability.header } />
        </ListItem>
    );
};

const getSection = ( availability: SectionAvailability ) =>
{
    switch ( availability.publishStatus )
    {
        case ItemStatus.New:
            return getNewSection( availability );
        case ItemStatus.PatreonOnly:
            return getPatreonSection( availability );
        case ItemStatus.Public:
            return getNormalSection( true, availability );
        default:
            return getNormalSection( false, availability );
    }
};

function Chapter ( props: ChapterProps ): JSX.Element
{
    if ( props.availability == undefined )
    {
        throw new Error( 'Availability was wrong!' );
    }

    return (
        <>
            <ListItem>
                <ListItemText
                    sx={ { color: props.availability.publishStatus == ItemStatus.Unpublished ? 'text.disabled' : 'inherit' } }
                    primary={ props.availability.header } />
            </ListItem>
            <List sx={ { pl: 8 } }>
                { props.availability.sections && props.availability.sections.map( ( section ) => getSection( section ) ) }
            </List>
        </>
    );
}


export default function TOCChapter ( props: TOCChapterProps )
{
    let availability = props.availability == undefined && props.cosmicProps != undefined ?
        mapTOCChapterAvailability( props.cosmicProps ) : props.availability;

    let chapterProps = {
        availability
    } as ChapterProps;

    return (
        <ErrorBoundary FallbackComponent={ ErrorFallback }>
            <Chapter { ...chapterProps }></Chapter>
        </ErrorBoundary>
    );
};