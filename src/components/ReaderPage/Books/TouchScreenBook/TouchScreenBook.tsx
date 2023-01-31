import React, { useState, useEffect } from "react";
import Styles from "./TouchScreenBook.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BookHolder } from "../Helpers/Pieces/BookHolder";
import { EpubReaderType, Orientation } from '../Helpers/enums';
import { EpubDetails } from "../../../../../interfaces/epub/epub-reader.interface";
import TitleCoverPortrait from "./TitleCover/TitleCoverPortrait";
import { Card, styled, useTheme } from "@mui/material";
import TitleCoverLandscape from "./TitleCover/TitleCoverLandscape";
import Page, { TouchScreenPageProps } from "./Page/Page";
import { ReaderState } from "../Helpers/interfaces";
import { useReducer } from "react";
import { readerReducer } from "../Helpers/functions";

function DetermineReaderType(
    isFullpageWidth: boolean,
    isHalfPageWidth: boolean
): EpubReaderType {
    if (isFullpageWidth) return EpubReaderType.fullPageWidth;
    else if (isHalfPageWidth) return EpubReaderType.halfPageWidth;
    else return EpubReaderType.fullWidth;
}

const ReadingArea = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    width: "100%",
    borderRadius: "4px 4px 0 0",
}));

export default function TouchScreenBook(details: EpubDetails) {
    const theme = useTheme();
    const isLandscapeMode = useMediaQuery("(orientation: landscape)");
    const isPortraitMode = useMediaQuery("(orientation: portrait)");
    const isSmallReader = useMediaQuery(`(min-width: calc(5.5in + 10px)`);
    const isLargeReader = useMediaQuery(`(min-width: calc(8.5in + 10px)`);
    const [orientation, setOrientation] = useState<Orientation>(
        isPortraitMode ? Orientation.portrait : Orientation.landscape
    );
    const [openReader, setOpenReader] = useState(true);
    const [readerState, dispatch] = useReducer(readerReducer, {
        largeEpub: details.largeEpub,
        smallEpub: details.smallEpub,
        currentScript: details.smallEpub,
        setting: EpubReaderType.halfPageWidth,
    } as ReaderState);
    
    useEffect(() => {
        setOrientation(
            isPortraitMode ? Orientation.portrait : Orientation.landscape
        );
        const newReaderType = DetermineReaderType(isLargeReader, isSmallReader);
        dispatch({ type: newReaderType });
    }, [isLandscapeMode, isPortraitMode, isSmallReader, isLargeReader]);

    const exitReaderView = () => {
        setOpenReader(false);
    }

    const openReaderView = () => {
        setOpenReader(true);
    }

    const pageProps = {
        EPubURL: readerState.currentScript,
        title: details.title,
        setting: readerState.setting,
        orientation: orientation,
        exitReader: exitReaderView
    } as TouchScreenPageProps;


    return (
        <BookHolder className={Styles.BookArea}>
            {openReader && (
                <ReadingArea>
                    <Page {...pageProps}></Page>
                </ReadingArea>
            )}
            {!openReader && (orientation === Orientation.portrait ? (
                <TitleCoverPortrait {...details} openReader={openReaderView} orientation={orientation} />
            ) : (
                <TitleCoverLandscape {...details} openReader={openReaderView} />
            ))}
        </BookHolder>
    );
}
