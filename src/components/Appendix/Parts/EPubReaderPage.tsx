import * as React from "react";
import dynamic from "next/dynamic";
import Styles from "./EPubReader.module.scss";
import { styled, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { EpubDetails, EpubHeader } from '../../../interfaces/epub/epub-reader.interface';
import { ReaderType } from "../../CustomReader/CustomerReader";
import classNames from 'classnames';

const ReadingArea = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    borderLeft: `solid 10px ${theme.palette.primary.dark}`
}));

const CoverArea = styled(Box)(({ theme }) => ({    
    display: 'flex',
    alignItems: 'center'
}));

const CustomReader = dynamic(() => import("../../CustomReader/CustomerReader"), {
    ssr: false
});
const TitleCover = dynamic(() => import("./EpubCover"), {
    ssr: false
});

interface PageStylingType {
    pageStyle: string;
    readerType: ReaderType;
    verticalShare: boolean;
}

export default function EPubReaderPage(props: EpubDetails) {
    const isLargerScreen = useMediaQuery("(min-width: 10in)");     
    const isMediumCross = useMediaQuery("(max-width: 1260px)");
    const isMediumTab = useMediaQuery("(max-width: 1160px)");
    const isSmallerScreen = useMediaQuery("(min-width: 6in) and (max-width: 10in)");
    const isMobilePortrait = useMediaQuery("(max-width: 6in)");

    const basicReaderWidth = {
        pageStyle: Styles.mobile,
        readerType: ReaderType.mobile,
        verticalShare: true
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
                pageStyle: Styles.small,
                readerType: ReaderType.small,
                verticalShare: false
            } as PageStylingType)
        }
        else if (isLargerScreen) {
            setPageStyling({
                pageStyle: isMediumTab ? Styles.small : Styles.large,
                readerType: ReaderType.large,
                verticalShare: isMediumCross && !isMediumTab
            } as PageStylingType)
        }
    }, [isLargerScreen, isMediumCross,isMediumTab, isSmallerScreen, isMobilePortrait, setPageStyling, smallEpubUrl, largeEpubUrl]);

    const isFullDisplay = isLargerScreen && !isMediumTab;

    const headerProps = {
        ...props,
        verticalButtons: pageStyling.verticalShare,
    } as EpubHeader;

    return <Box className={Styles.ReaderBody}>
        <div className={classNames(pageStyling.pageStyle, Styles.SlidesHolder)}>
            { !isFullDisplay &&
                <CoverArea className={classNames(pageStyling.pageStyle, Styles.coverArea)}>
                    <TitleCover {...headerProps} ></TitleCover>
                </CoverArea>
            }            
            <div className={Styles.ReaderSlides}>
                <ReadingArea className={classNames(pageStyling.pageStyle, Styles.readerArea)}>
                    <CustomReader
                        title={props.title}
                        resourceUrl={script}
                        readerType={pageStyling.readerType}
                        showPullTab={!isFullDisplay}
                    />
                </ReadingArea>
            </div>
            { isFullDisplay &&
                <CoverArea className={classNames(pageStyling.pageStyle, Styles.coverArea)}>
                    <TitleCover {...headerProps} ></TitleCover>
                </CoverArea>
            }
        </div>
    </Box>;
}