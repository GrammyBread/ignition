import { ItemStatus } from '../../mappers/availability/state.mappers';
import Link from 'next/link';
import { ListItemText, Typography } from '@mui/material';

export function getLinkedTitle(publishStatus: ItemStatus, title: string, slug?: string): JSX.Element {
    let shouldDisplayLink = publishStatus != ItemStatus.Unpublished && publishStatus != ItemStatus.PatreonOnly;
    let chapterTitle = (
        <ListItemText
            sx={{ color: publishStatus == ItemStatus.Unpublished ? 'text.disabled' : 'inherit' }}
            primary={title} />);

    return shouldDisplayLink && slug ?
        <Link href={slug}>
            {chapterTitle}
        </Link>
        : chapterTitle;
}

export function getUnlikedTitle(header: string): JSX.Element {
    return (
        <ListItemText primary={
            <Typography align="center" variant="h4" sx={{
                textDecoration: 'underline'
            }}>
                {header}
            </Typography>
        } />);
}