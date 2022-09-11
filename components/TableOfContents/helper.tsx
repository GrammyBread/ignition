import { ItemStatus } from '../../mappers/availability/state.mappers';
import Link from 'next/link';
import { ListItemText, styled, Typography } from '@mui/material';

export const Circle = styled('div', {
    shouldForwardProp: (prop) => prop !== 'isPrimary',
})<{ isPrimary?: boolean }>(({ theme, isPrimary }) => ({
    backgroundColor: isPrimary ? theme.palette.primary.main : theme.palette.error.main,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    height: 'fit-content',
    padding: '5px'
}));


export function getLinkedTitle(publishStatus: ItemStatus, title: string, slug?: string, shouldPad?: boolean): JSX.Element {
    let shouldDisplayLink = publishStatus != ItemStatus.Unpublished && publishStatus != ItemStatus.PatreonOnly;
    let listTitle = (
        <ListItemText
            sx={{
                color: publishStatus == ItemStatus.Unpublished ? 'text.disabled' : 'inherit',
                ...(shouldPad && {
                    paddingTop: ".25rem",
                    paddingBottom: ".25rem"
                })
            }}
            primary={title} />);

    return shouldDisplayLink && slug ?
        <Link href={slug}>
            {listTitle}
        </Link>
        : listTitle;
}

export function getUnlikedTitle(header: string): JSX.Element {
    return (
        <>
            <ListItemText primary={
                <Typography align="center" variant="h4" component="h2">
                    {header}
                </Typography>
            } />
        </>
    );
}