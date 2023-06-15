import Link from "next/link";
import { INTRO_SECTION_PATH } from "../../../mappers/pathname.mapper";
import { ParsedUrlQuery } from "querystring";
import { Button, Typography } from "@mui/material";
import Styles from './Chapter.module.scss';

interface ChapterIntroButtonProps {
    slug: string | ParsedUrlQuery;
    isChapterPage?: boolean;
}

export function ChapterIntroButton({ slug, isChapterPage }: ChapterIntroButtonProps): JSX.Element {
    return <Link
        className={Styles.intro}
        href={{
            pathname: INTRO_SECTION_PATH,
            query: slug
        }}>
        <Button
            variant="contained"
            size="medium"
            color='secondary'
            sx={{
                width: '50%',
                mb: isChapterPage ? 0 : 2
            }}>
            <Typography>Read Intro</Typography>
        </Button>
    </Link>
}