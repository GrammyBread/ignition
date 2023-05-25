import * as React from 'react';
import { List, ListItem, Button, Typography, Divider, Stack, ListItemText, styled } from '@mui/material';
import getSection from '../Sections/shared';
import { INTRO_SECTION_PATH, NORMAL_CHAPTER_PATH } from '../../../mappers/pathname.mapper';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { NavigationChapter, PublishStatus } from '../../../interfaces/read/nav-data.interfaces';
import Styles from './Chapter.module.scss';
import { AnimatedLink } from '../helper';

function ChapterHeader(status: PublishStatus, header: string, slug?: ParsedUrlQuery | string): JSX.Element {
    const isPatreonOnly = status === PublishStatus.PatreonOnly;

    if (status != PublishStatus.Unpublished) {
        const textItem = <ListItemText
            primary={
                <Typography variant="h5" component="h2">
                    {header}
                </Typography>
            } />;

        if (slug || status === PublishStatus.PatreonOnly) {
            return (<AnimatedLink isPatreonOnly={isPatreonOnly}
                href={isPatreonOnly ?
                    '/patreon' : {
                        query: slug as ParsedUrlQuery,
                        pathname: NORMAL_CHAPTER_PATH
                    }}
            >
                {textItem}
            </AnimatedLink>);
        }
    }

    return <ListItemText
        sx={{ color: 'text.disabled' }}
        primary={
            <Typography variant="h5" component="h2">
                {header}
            </Typography>
        } />;
}

export function ContentChapter(props: NavigationChapter): JSX.Element {
    let availability = props.status;
    const isAvailable = props.status != PublishStatus.Unpublished;
    const isPatreonOnly = props.status === PublishStatus.PatreonOnly;

    if (availability == undefined) {
        throw new Error('Availability was wrong!');
    }

    return (
        <Stack
            className={Styles.chapterContent}
            divider={!isAvailable ? <Divider flexItem /> : <></>}
            justifyContent={"left"}
            alignItems={"left"}
            spacing={2}
        >
            <ListItem>
                {ChapterHeader(props.status, props.title, props.slug)}
            </ListItem>
            {isAvailable && !isPatreonOnly && props.slug &&
                <>
                    <Link
                        className={Styles.intro}
                        href={{
                            pathname: INTRO_SECTION_PATH,
                            query: props.slug
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
                    <Divider flexItem />
                </>
            }
            <List sx={{ pl: 6 }}>
                {props.sections && props.sections.map((section) =>
                    <div key={section.key}>
                        {getSection(section)}
                    </div>)}
            </List>
        </Stack>
    );
}