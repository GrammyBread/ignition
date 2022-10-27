import * as React from 'react';
import { List, ListItem, Button, Typography, Divider, Stack } from '@mui/material';
import getSection from '../Sections/shared';
import { getLinkedSectionTitle, getUnlikedTitle, getPatreonSectionTitle } from '../helper';
import { Chapter } from '../../../interfaces/read/view-data.interfaces';
import { INTRO_SECTION_PATH, NORMAL_CHAPTER_PATH } from '../../../mappers/pathname.mapper';
import Link from 'next/link';
import { ItemStatus } from '../../../mappers/availability/state.mappers';
import { ParsedUrlQuery } from 'querystring';

export interface ChapterProps {
    showLinkedHeader: boolean;
    availability: Chapter;
}

function ChapterHeader(status: ItemStatus, header: string, showLinkedHeader: boolean, fullPath?: ParsedUrlQuery): JSX.Element {
    if (showLinkedHeader && status != ItemStatus.Unpublished) {
        if (fullPath)
            return getLinkedSectionTitle(status, header, {
                query: fullPath,
                pathname: NORMAL_CHAPTER_PATH
            })
        if (status == ItemStatus.PatreonOnly) {
            getPatreonSectionTitle(status, header);
        }
    }
    return getUnlikedTitle(header, showLinkedHeader);
}

export function TOCChapter(props: ChapterProps): JSX.Element {
    let availability = props.availability;

    if (availability == undefined) {
        throw new Error('Availability was wrong!');
    }

    return (
        <Stack
            divider={!props.showLinkedHeader ? <Divider flexItem /> : <></>}
            justifyContent={!props.showLinkedHeader ? "center" : "left"}
            alignItems={!props.showLinkedHeader ? "center" : "left"}
            spacing={2}
        >
            <ListItem key={props.availability.key}>
                {ChapterHeader(props.availability.publishStatus, props.availability.header, props.showLinkedHeader, props.availability.fullPath)}
            </ListItem>
            {!props.showLinkedHeader && props.availability.fullPath &&
                <Link href={{
                    pathname: INTRO_SECTION_PATH,
                    query: props.availability.fullPath
                }}>
                    <Button
                        variant="contained"
                        size="medium"
                        color='secondary'
                        sx={{
                            width: '50%'
                        }}>
                        <Typography>Read Intro</Typography>
                    </Button>
                </Link>
            }
            <List sx={{ pl: !props.showLinkedHeader ? 0 : 6 }}>
                {availability.sections && availability.sections.map((section) =>
                    <div key={section.key}>
                        {getSection(section)}
                    </div>)}
            </List>
        </Stack>
    );
}