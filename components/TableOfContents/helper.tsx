import { ItemStatus } from '../../mappers/availability/state.mappers';
import Link from 'next/link';
import { ListItemText } from '@mui/material';

export default function getLinkedTOCTitle(publishStatus: ItemStatus, title: string, slug?: string): JSX.Element {
    let shouldDisplayLink = publishStatus != ItemStatus.Unpublished && publishStatus != ItemStatus.PatreonOnly;
    let chapterTitle = (
        <ListItemText
            sx={{ color: publishStatus == ItemStatus.Unpublished ? 'text.disabled' : 'inherit' }}
            primary={title} />);

    return shouldDisplayLink && slug ?
        <Link href={`/${slug}`}>
            {chapterTitle}
        </Link>
        : chapterTitle;
}