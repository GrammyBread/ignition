import { Grid, styled, Card, useMediaQuery, useTheme } from "@mui/material";
import Styles from "./DesktopBook.module.scss";
import TitleCoverSmall from "./TitleCover/TitleCoverSmall";
import { EpubDetails } from "../../../../../interfaces/epub/epub-reader.interface";
import { useEffect, useReducer } from "react";
import { BookHolder, EpubReaderType, ReaderState, readerReducer } from "../helpers";
import TitleCoverWide from "./TitleCover/TitleCoverWide";
import dynamic from "next/dynamic";
import { PageProps } from "../Page/Page";

const ReadingArea = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    borderRadius: "4px 4px 0 0"
}));

const BookArea = styled(Grid)(({
    height: '100%',
    marginTop: 0,
    marginLeft: 0,
}));

function DetermineReaderType(
    isFullpageWidth: boolean,
    isHalfPageWidth: boolean
): EpubReaderType {
    if (isFullpageWidth) return EpubReaderType.fullPageWidth;
    else if (isHalfPageWidth) return EpubReaderType.halfPageWidth;
    else return EpubReaderType.fullWidth;
}

const Page = dynamic(() => import("../Page/Page"), {
    ssr: false
});

export default function DesktopBook(details: EpubDetails): JSX.Element {
    const theme = useTheme();
    const [readerState, dispatch] = useReducer(readerReducer, {
        largeEpub: details.largeEpub,
        smallEpub: details.smallEpub,
        currentScript: details.smallEpub,
        setting: EpubReaderType.halfPageWidth
    } as ReaderState);
    const isSmallReader = useMediaQuery(`(min-width: calc(6in + 3in + ${theme.spacing(6)})`);
    const isLargeReader = useMediaQuery(`(min-width: calc(9in + 3in + ${theme.spacing(6)})`);

    useEffect(() => {
        const newReaderType = DetermineReaderType(isLargeReader, isSmallReader);
        dispatch({ type: newReaderType });
    }, [isSmallReader, isLargeReader]);

    const pageProps = {
        EPubURL: readerState.currentScript,
        title: details.title,
        setting: readerState.setting
    } as PageProps;

    return <BookHolder className={Styles.BookArea}>
        <BookArea container className={Styles.BookBinder} spacing={3}>
            <Grid item className={Styles.ReadingAreaHolder}>
                <ReadingArea className={Styles.ReadingArea}>
                    <Page {...pageProps}/>
                </ReadingArea>
            </Grid>
            <Grid item className={Styles.TitleCoverHolder}>
                {readerState.setting == EpubReaderType.fullWidth ?
                    <TitleCoverWide {...details}></TitleCoverWide> :
                    <TitleCoverSmall {...details}></TitleCoverSmall>}
            </Grid>
        </BookArea>
    </BookHolder>;
}
