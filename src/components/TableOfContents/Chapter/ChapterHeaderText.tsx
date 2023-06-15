import { ParsedUrlQuery } from "querystring";
import { PublishStatus } from "../../../interfaces/read/nav-data.interfaces";
import { ListItem, ListItemText, Typography } from "@mui/material";
import { AnimatedLink } from "../helper";
import { NORMAL_CHAPTER_PATH } from "../../../mappers/pathname.mapper";
import { ChapterIntroButton } from "./ChapterIntroButton";

interface ChapterHeaderTextProps {
    status: PublishStatus;
    header: string;
    isChapterPage: boolean;
    slug?: ParsedUrlQuery | string;
}

export function ChapterHeaderText({ status, header, isChapterPage, slug }: ChapterHeaderTextProps): JSX.Element {
    const isPatreonOnly = status === PublishStatus.PatreonOnly;
    const isAvailable = status != PublishStatus.Unpublished;

    if (status != PublishStatus.Unpublished) {
        const textItem = <ListItemText
            primary={
                <Typography variant="h5" component="h2" textAlign={isChapterPage ? "center" : "left"}>
                    {header}
                </Typography>
            } />;

        if (slug || status === PublishStatus.PatreonOnly) {
            return (
                <>
                    <ListItem>
                        <AnimatedLink isPatreonOnly={isPatreonOnly}
                            href={isPatreonOnly ?
                                '/patreon' : {
                                    query: slug as ParsedUrlQuery,
                                    pathname: NORMAL_CHAPTER_PATH
                                }}
                        >
                            {textItem}
                        </AnimatedLink>
                    </ListItem>
                    {isAvailable && !isPatreonOnly && slug &&
                        <ChapterIntroButton slug={slug} isChapterPage={isChapterPage}/>
                    }
                </>

            );
        }
    }

    return <ListItem>
        <ListItemText
            sx={{ color: 'text.disabled' }}
            primary={
                <Typography variant="h5" component="h2">
                    {header}
                </Typography>
            } />
    </ListItem>;
}