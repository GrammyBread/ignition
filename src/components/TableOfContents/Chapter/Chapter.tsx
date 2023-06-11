import * as React from 'react';
import { List, ListItem, Button, Typography, Divider, Stack, ListItemText, styled, useTheme } from '@mui/material';
import getSection from '../Sections/shared';
import { INTRO_SECTION_PATH, NORMAL_CHAPTER_PATH } from '../../../mappers/pathname.mapper';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { NavigationChapter, PublishStatus } from '../../../interfaces/read/nav-data.interfaces';
import Styles from './Chapter.module.scss';
import { AnimatedLink } from '../helper';

function ChapterHeader(status: PublishStatus, header: string, isChapterPage: boolean, slug?: ParsedUrlQuery | string): JSX.Element {
    const isPatreonOnly = status === PublishStatus.PatreonOnly;

    if (status != PublishStatus.Unpublished) {
        const textItem = <ListItemText
            primary={
                <Typography variant="h5" component="h2" textAlign={isChapterPage ? "center" : "left"}>
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

interface ContentChapterProps {
    content: NavigationChapter;
    logline?: string;
}

export function ContentChapter({ content, logline }: ContentChapterProps): JSX.Element {
    const theme = useTheme();
    let availability = content.status;
    const isAvailable = content.status != PublishStatus.Unpublished;
    const isPatreonOnly = content.status === PublishStatus.PatreonOnly;

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
            <div>
                <ListItem>
                    {ChapterHeader(content.status, content.title, !!logline, content.slug)}
                </ListItem>
                {logline &&
                    <Typography 
                    variant="body1" 
                    component="div" 
                    dangerouslySetInnerHTML={{ __html: logline }} 
                    sx={{
                        fontVariant: "normal",
                        margin: `0px ${theme.spacing(2)}`,
                        "p": {
                            marginTop: "0px"
                        }
                    }}/>
                }
            </div>
            {isAvailable && !isPatreonOnly && content.slug &&
                <>
                    <Link
                        className={Styles.intro}
                        href={{
                            pathname: INTRO_SECTION_PATH,
                            query: content.slug
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
                {content.sections && content.sections.map((section) =>
                    <div key={section.key}>
                        {getSection(section)}
                    </div>)}
            </List>
        </Stack>
    );
}