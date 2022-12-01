import { Paper, styled } from '@mui/material';
import { DisplayedLocation } from 'epubjs/types/rendition';
import React, { useState, useEffect } from 'react';
import { EpubViewer, EpubViewerStyles } from './EPubViewer';
import { BookOptions } from 'epubjs/types/book';
import { ViewerLoading } from './ViewerLoading';
import { useTheme } from '@mui/material';
import Styles from './CustomReader.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import classNames from 'classnames';
import { ChevronLeft, PropaneSharp } from '@mui/icons-material';
import Link from 'next/link';

interface CustomReaderProps {
    resourceUrl: string;
    title: string;
    readerType: ReaderType;
    showPullTab: boolean;
}

export enum ReaderType {
    mobile,
    small,
    large
}

export enum Orientiation {
    landscape,
    portrait
}

const Reader = styled("div", {
    shouldForwardProp: (prop) => prop !== "color",
})<{ color: string }>(({ color }) => ({
    background: color,
    border: `solid ${color}`,
    borderWidth: '5px 5px 0 5px'
}));

export default function CustomReader({ resourceUrl, title, readerType, showPullTab }: CustomReaderProps) {
    const isLandscapeMode = useMediaQuery('(orientation: landscape)');
    const isPortraitMode = useMediaQuery('(orientation: portrait)');
    // And your own state logic to persist state
    const [location, setLocation] = useState<DisplayedLocation | undefined>(undefined)
    const [readerTypeStyles, setReaderTypeStyles] = useState({ className: Styles.mobile, viewerWidth: "min(5.5in, 100%)" })
    const [orientation, setOrientation] = useState<Orientiation>(isPortraitMode ? Orientiation.portrait : Orientiation.landscape);

    useEffect(() => {
        let newStyle = readerType === ReaderType.mobile && { className: Styles.mobile, viewerWidth: "min(5.5in, 100%)" } ||
            readerType === ReaderType.large && { className: Styles.large, viewerWidth: "5.5in" } ||
            readerType === ReaderType.small && { className: Styles.small, viewerWidth: "8.5in" };
        if (newStyle) {
            setReaderTypeStyles(newStyle);
        }
        setOrientation(isPortraitMode ? Orientiation.portrait : Orientiation.landscape);
        console.log(`orientation| lanscape: ${isLandscapeMode}. portrait: ${isPortraitMode}`);
    }, [readerType, setReaderTypeStyles, isLandscapeMode, isPortraitMode]);

    const locationChanged = (epubcifi: DisplayedLocation) => {
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi)
    }

    const theme = useTheme();

    const styles = {
        view: {
        },
        holder: {
            height: '100%',
            flex: '1',
            overflowY: 'scroll'
        }
    } as EpubViewerStyles;

    const initConfig = {

    } as BookOptions

    const loadingView = <ViewerLoading />;

    return <Paper square elevation={0} id="test" sx={{
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        maxHeight: '100%',
        height: '90vh',
        width: '100%'
    }}>
        <div className={classNames(Styles.holder, readerTypeStyles.className)}>
            {
                showPullTab &&
                <div className={classNames(Styles.puller, readerTypeStyles.className)}>
                    <Link href='#test' scroll={false}>
                        <ChevronLeft fontSize='large'></ChevronLeft>
                    </Link>
                </div>
            }
            <div className={classNames(Styles.tocToggle, readerTypeStyles.className)}>
                {title}
            </div>
            <Reader className={classNames(Styles.reader, readerTypeStyles.className)}
                color={theme.palette.mode === 'dark' ? '#424242' : '#424242'}>
                <EpubViewer
                    url={resourceUrl}
                    bookTitle="testDocument"
                    styles={styles}
                    orientation={orientation}
                    loadingView={loadingView}
                    epubInitOptions={initConfig}
                    renditionWidth={readerTypeStyles.viewerWidth}
                    locationChanged={epubcifi => console.log(epubcifi)}
                />
            </Reader>
        </div>
    </Paper>;
}