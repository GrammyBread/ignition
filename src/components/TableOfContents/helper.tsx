import { ItemStatus } from '../../mappers/availability/state.mappers';
import Link from 'next/link';
import { ListItemText, styled, Typography } from '@mui/material';
import { ParsedUrlQuery } from 'querystring';
import { NORMAL_SECTION_PATH } from '../../mappers/pathname.mapper';

export const Circle = styled('div', {
    shouldForwardProp: (prop) => prop !== 'backingColor',
})<{ backingColor?: string }>(({ theme, backingColor }) => ({
    backgroundColor: backingColor || theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    height: 'fit-content',
    padding: '5px'
}));

export interface SlugDetails {
    query: ParsedUrlQuery,
    pathname: string;
}

export function getPatreonSectionTitle(publishStatus: ItemStatus, title: string, shouldPad?: boolean): JSX.Element {
    let listTitle = (
        <ListItemText
            sx={{
                color: 'warn.main',
                ...(shouldPad && {
                    paddingTop: ".25rem",
                    paddingBottom: ".25rem"
                })
            }}
            primary={title} />);

    return (<Link href={'/patreon'}>
        {listTitle}
    </Link>)
}

export function getLinkedSectionTitle(publishStatus: ItemStatus, title: string, slugDetails: SlugDetails, shouldPad?: boolean): JSX.Element {
    let listTitle = (
        <ListItemText
            sx={{
                ...(shouldPad && {
                    paddingTop: ".25rem",
                    paddingBottom: ".25rem"
                })
            }}
            primary={title} />);

    return (<Link href={{
        pathname: slugDetails.pathname,
        query: slugDetails.query,
    }}>
        {listTitle}
    </Link>);
}

export function getUnlikedTitle(header: string, normal: boolean, shouldPad?: boolean): JSX.Element {
    return (
        normal ?
            (<ListItemText
                sx={{
                    color: 'text.disabled',
                    ...(shouldPad && {
                        paddingTop: ".25rem",
                        paddingBottom: ".25rem"
                    })
                }}
                primary={header} />)
            :
            (<ListItemText primary={
                <Typography align="center" variant="h4" component="h2">
                    {header}
                </Typography>
            } />)
    );
}