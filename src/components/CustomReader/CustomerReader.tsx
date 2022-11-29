import { Paper} from '@mui/material';
import { DisplayedLocation } from 'epubjs/types/rendition';
import React, { useState, useEffect } from 'react';
import { EpubViewer, EpubViewerStyles } from './EPubViewer';
import { BookOptions } from 'epubjs/types/book';
import { ViewerLoading } from './ViewerLoading';
import { useTheme } from '@mui/material';
import Styles from './CustomReader.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import classNames from 'classnames';

interface CustomReaderProps {
    resourceUrl: string;
    title: string;
    readerType: ReaderType;
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

export default function CustomReader({ resourceUrl, title, readerType }: CustomReaderProps) {
    const isLandscapeMode = useMediaQuery('(orientation: landscape)');
    const isPortraitMode = useMediaQuery('(orientation: portrait)');
    // And your own state logic to persist state
    const [location, setLocation] = useState<DisplayedLocation | undefined>(undefined)
    const [readerTypeStyles, setReaderTypeStyles] = useState({ className: Styles.mobile, viewerWidth: "min(5.5in, 100%)" })
    const [orientation, setOrientation] = useState<Orientiation>(isPortraitMode ? Orientiation.portrait : Orientiation.landscape);

    useEffect(() => {
        setOrientation(isPortraitMode ? Orientiation.portrait : Orientiation.landscape);
        console.log(`orientation| lanscape: ${isLandscapeMode}. portrait: ${isPortraitMode}`)
    }, [isLandscapeMode, isPortraitMode]);

    useEffect(() => {
        let newStyle = ReaderType.mobile && { className: Styles.mobile, viewerWidth: "min(5.5in, 100%)" } ||
            ReaderType.large && { className: Styles.large, viewerWidth: "5.5in" } ||
            ReaderType.small && { className: Styles.small, viewerWidth: "8.5in" };
        setReaderTypeStyles(newStyle);
    }, [readerType, setReaderTypeStyles]);

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

    return <Paper sx={{
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        height: '90vh',
        width: '100%'
    }}>
        <div className={classNames(Styles.holder, readerTypeStyles.className)}>
            <div className={classNames(Styles.tocToggle, readerTypeStyles.className)}>
                {title}
            </div>
            <div className={classNames(Styles.reader, readerTypeStyles.className)} style={{
                background: theme.palette.mode === 'dark' ? "#424242" : "#424242"
            }}>
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
            </div>
        </div>
    </Paper>;
}