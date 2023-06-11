import { Divider, Stack } from "@mui/material"
import Styles from './Chapter.module.scss';

interface ChapterStackProps {
    children: React.ReactNode;
    isChapterPage: boolean;
}

export const ChapterStack = ({
    children,
    isChapterPage
}: ChapterStackProps): JSX.Element => (
    <Stack
        className={Styles.chapterContent}
        divider={isChapterPage ? <></> : <Divider flexItem />}
        justifyContent={"left"}
        alignItems={"left"}
        spacing={isChapterPage ? 2 : 0}
    >
        {children}
    </Stack>
)