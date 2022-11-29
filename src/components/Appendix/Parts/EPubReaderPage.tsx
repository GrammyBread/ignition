import * as React from "react";
import dynamic from "next/dynamic";
import Styles from "./EPubReader.module.scss";
import { styled, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { EpubDetails, EpubHeader } from '../../../interfaces/epub/epub-reader.interface';
import { ReaderType } from "../../CustomReader/CustomerReader";
import classNames from 'classnames';

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

interface PageStylingType {
    pageStyle: string;
    readerType: ReaderType;
}

export default function EPubReaderPage(props: EpubDetails) {
    const isLargerScreen = useMediaQuery("(min-width: 10in)");
    const isSmallerScreen = useMediaQuery("(min-width: 6in) and (max-width: 10in)");
    const isMobilePortrait = useMediaQuery("(max-width: 6in)");

    const basicReaderWidth = {
        pageStyle: Styles.mobilePage,
        readerType: ReaderType.mobile
    } as PageStylingType;

    const [script, setScriptPdf] = React.useState(props.smallEpub);
    const [pageStyling, setPageStyling] = React.useState(basicReaderWidth);

    const smallEpubUrl = props.smallEpub;
    const largeEpubUrl = props.largeEpub;
    
    React.useEffect(() => {
        let useSmallScript = isSmallerScreen || isMobilePortrait;
        setScriptPdf(useSmallScript ? smallEpubUrl : largeEpubUrl);

        if (isMobilePortrait) {
            setPageStyling(basicReaderWidth)
        }
        else if (isSmallerScreen) {
            setPageStyling({
                pageStyle: Styles.smallPage,
                readerType: ReaderType.small
            } as PageStylingType)
        }
        else if (isLargerScreen) {
            setPageStyling({
                pageStyle: Styles.largePage,
                readerType: ReaderType.large
            } as PageStylingType)
        }
    }, [isLargerScreen, isSmallerScreen, isMobilePortrait, setPageStyling, smallEpubUrl, largeEpubUrl]);


    const headerProps = {
        ...props
    } as EpubHeader;

    return <Box className={Styles.ReaderBody}>
        <div className={Styles.SlidesHolder}>
            <div className={Styles.ReaderSlides}>
                <CoverArea className={classNames(pageStyling.pageStyle, Styles.coverArea)}>
                    <AppendixHeader {...headerProps} ></AppendixHeader>
                </CoverArea>
                <ReadingArea className={classNames(pageStyling.pageStyle, Styles.readerArea)}>
                    <CustomReader
                        title={props.title}
                        resourceUrl={script}
                        readerType={pageStyling.readerType}
                    />
                </ReadingArea>
            </div>
        </div>
    </Box>;
}