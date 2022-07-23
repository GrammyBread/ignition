import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { TableOfContentsPart, ChapterAvailability, ItemStatus, SectionAvailability } from '../../interfaces/view-data.interfaces';
import { Badge, List, ListItem } from '@mui/material';
import Styles from './TOCChapter.module.scss'
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

const getChapterStyle = (status: ItemStatus) => {
    switch (status) {
        case ItemStatus.Published:
            Styles.publishedChapter;
        case ItemStatus.OnPatreon:
            return Styles.patreonOnlyChapter;
        default:
            return Styles.unpublishedChapter;
    }
}

const getPatreonSection = (title: string): JSX.Element => {
    let tooltip =
        <React.Fragment>
            <Typography color="inherit">This Section is Patreon Only</Typography>
            <b>{'Want to keep reading?'}</b>
            <br />
            {"You can read this section by subscribing on Patreon"}
        </React.Fragment>;

    return (
        <ListItem className={Styles.patreonOnlySection}>
            <HtmlTooltip title={
                tooltip
            }>
                <Badge className={Styles.patreonOnlySection} color="secondary" badgeContent="Patreon">
                    <ListItemText primary={title} />
                </Badge>
            </HtmlTooltip>
        </ListItem>)
}

const getNewSection = (title: string) => {
    return (
        <ListItem className={Styles.newSection}>
            <LightTooltip title="This is the newest section!">
                <Badge className={Styles.publishedSection} color="secondary" badgeContent="Patreon">
                    <ListItemText primary={title} />
                </Badge>
            </LightTooltip>
        </ListItem>
    )
}

const getNormalSection = (isPublished: boolean, availability: SectionAvailability) => {
    return (
        <ListItem key={availability.slug != undefined ? availability.slug : availability.title} className={isPublished ? Styles.publishedSection : Styles.unpublishedSection}>
            <ListItemText primary={availability.title} />
        </ListItem>
    )
}

const getSection = (availability: SectionAvailability) => {
    switch (availability.status) {
        case ItemStatus.New:
            return getNewSection(availability.title);
        case ItemStatus.OnPatreon:
            return getPatreonSection(availability.title);
        case ItemStatus.Published:
            return getNormalSection(true, availability);
        default:
            return getNormalSection(false, availability);
    }
}

export default function TOCChapter(props: ChapterAvailability) {
    let chapterStyle = getChapterStyle(props.status)

    return (
        <>
            <ListItem className={chapterStyle}>
                <ListItemText primary={props.title} />
            </ListItem>
            <List sx={{ pl: 8 }}>
                {props.sections && props.sections.map((section) => getSection(section))}
            </List>
        </>
    )
};