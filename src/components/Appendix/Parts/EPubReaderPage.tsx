import * as React from "react";
import dynamic from "next/dynamic";
import Styles from "./EPubReader.module.scss";
import { styled, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { EpubDetails, EpubHeader } from '../../../interfaces/epub/epub-reader.interface';

const ReadingArea = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main
}));

const CoverArea = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
}));

const CustomReader = dynamic(() => import("../../CustomReader/CustomerReader"), {
    ssr: false
});
const AppendixHeader = dynamic(() => import("./EpubCover"), {
    ssr: false
});

interface ReaderSizing {
    readingAreaClass: string;
    coverAreaClass: string;
    customReaderWidth: string;
}

export default function EPubReaderPage(props: EpubDetails) {
    const isLargerScreen = useMediaQuery("(min-width: 10in)");
    const isSmallerScreen = useMediaQuery("(min-width: 6in) and (max-width: 10in)");
    const isMobilePortrait = useMediaQuery("(max-width: 6in)");

    const basicReaderWidth = {
        readingAreaClass: Styles.ReaderHolderMobile,
        coverAreaClass: Styles.CoverHolderMobile,
        customReaderWidth: "min(5.5in, 100%)"
    }   as ReaderSizing;

    const [script, setScriptPdf] = React.useState(props.smallEpub);
    const [readerWidths, setReaderWidths] = React.useState(basicReaderWidth);

    const useSmallScript = isSmallerScreen || isMobilePortrait;
    const smallEpubUrl = props.smallEpub;
    const largeEpubUrl = props.largeEpub;

    React.useEffect(() => {
        setScriptPdf(useSmallScript ? smallEpubUrl : largeEpubUrl);
    }, [useSmallScript, smallEpubUrl, largeEpubUrl]);
    
    React.useEffect(() => {
        if(isMobilePortrait) {
            setReaderWidths(basicReaderWidth)
        }
        else if(isSmallerScreen) {
            setReaderWidths({
                readingAreaClass: Styles.ReaderHolderMid,
                coverAreaClass: Styles.CoverHolderMid,
                customReaderWidth: "min(5.5in, 100%)"
            }   as ReaderSizing)
        }
        else if(isLargerScreen) {
            setReaderWidths({
                readingAreaClass: Styles.ReaderHolderLarge,
                coverAreaClass: Styles.CoverHolderLarge,
                customReaderWidth: "8.5in"
            }   as ReaderSizing)
        }
    }, [isLargerScreen, isSmallerScreen, isMobilePortrait, setReaderWidths]);


    const headerProps = {
        ...props
    } as EpubHeader;

    return <Box className={Styles.ReaderBody}>
        <style>
            {`
            `}
        </style>
        <div className={Styles.SlidesHolder}>
            <div className={Styles.ReaderSlides}>
                <CoverArea className={readerWidths.coverAreaClass}>
                    <AppendixHeader {...headerProps} ></AppendixHeader>
                </CoverArea>
                <ReadingArea className={readerWidths.readingAreaClass}>
                    <CustomReader
                        title={props.title}
                        resourceUrl={script}
                        width={readerWidths.customReaderWidth}
                    />
                </ReadingArea>
            </div>
        </div>
    </Box>;
}