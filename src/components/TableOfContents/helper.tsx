import Link from 'next/link';
import { ListItemText, styled, Typography } from '@mui/material';
import { ParsedUrlQuery } from 'querystring';
import { NORMAL_SECTION_PATH } from '../../mappers/pathname.mapper';
import { PublishStatus } from '../../interfaces/read/nav-data.interfaces';

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

export function getPatreonSectionTitle(publishStatus: PublishStatus, title: string, shouldPad?: boolean): JSX.Element {
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

export function getLinkedSectionTitle(publishStatus: PublishStatus, title: string, slugDetails: SlugDetails, shouldPad?: boolean): JSX.Element {
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

export const AnimatedLink = styled(Link, { shouldForwardProp: (prop) => prop !== 'isPatreonOnly' })<{
    isPatreonOnly?: boolean;
}>(({ theme, isPatreonOnly = false }) => ({
    color: isPatreonOnly ? theme.palette.warning.main : theme.palette.text.primary,
    position: 'relative',
    display: 'inline-block',

    "::before": {
        content: `""`,
        position: 'absolute',
        width: 0,
        height: '2px',
        bottom: 0,
        left: 0,
        backgroundColor: isPatreonOnly ? theme.palette.warning.main : theme.palette.text.primary,
        visibility: 'hidden',
        transition: 'all 0.3s ease-in-out'
    },

    ":hover::before": {
        visibility: 'visible',
        width: '100%'
    }
}));