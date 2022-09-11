import * as React from 'react';
import { List, ListItem, Button, Typography, Divider, Stack } from '@mui/material';
import getSection from '../Sections/shared';
import { getLinkedTitle, getUnlikedTitle } from '../helper';
import { Chapter } from '../../../interfaces/read/view-data.interfaces';

export interface ChapterProps {
    showLinkedHeader: boolean;
    availability: Chapter;
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
                {props.showLinkedHeader ?
                    getLinkedTitle(availability.publishStatus, availability.header, availability?.itemSlug)
                    :
                    getUnlikedTitle(availability.header)
                }
            </ListItem>
            {!props.showLinkedHeader &&
                <Button href={`${availability.itemSlug}/intro`}
                    variant="contained"
                    size="medium"
                    color='secondary'
                    sx={{
                        width: '50%'
                    }}>
                    <Typography>Read Intro</Typography>
                </Button>
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