import { Paper } from '@mui/material';
import { DisplayedLocation } from 'epubjs/types/rendition';
import React, { useState, useEffect } from 'react';
import { Resource } from '../../interfaces/read/read-metadata.interfaces';
import { EpubViewer, EpubViewerStyles } from './EPubViewer';
import { BookOptions } from 'epubjs/types/book';
import { ViewerLoading } from './ViewerLoading';
import { useTheme } from '@mui/material';
import Styles from './CustomReader.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';

interface CustomReaderProps {
    EpubDoc: Resource;
    title: string;
}

export enum Orientiation {
    landscape,
    portrait
}

export default function CustomReader({ EpubDoc, title }: CustomReaderProps) {
    const isLandscapeMode = useMediaQuery('(orientation: landscape)');
    const isPortraitMode = useMediaQuery('(orientation: portrait)');
    // And your own state logic to persist state
    const [location, setLocation] = useState<DisplayedLocation | undefined>(undefined)
    const [orientation, setOrientation] = useState<Orientiation>(isPortraitMode ? Orientiation.portrait : Orientiation.landscape);

    useEffect(()=> {
        setOrientation(isPortraitMode ? Orientiation.portrait : Orientiation.landscape);
        console.log(`orientation| lanscape: ${isLandscapeMode}. portrait: ${isPortraitMode}`)
    }, [isLandscapeMode, isPortraitMode]);

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
        <div className={Styles.holder}>
            <div className={Styles.tocToggle}>
            </div>
            <div className={Styles.reader} style={{
                background: theme.palette.mode === 'dark' ? "#424242" : "#424242"
            }}>
                <EpubViewer
                    url={EpubDoc.url}
                    bookTitle="testDocument"
                    styles={styles}
                    orientation={orientation}
                    loadingView={loadingView}
                    epubInitOptions={initConfig}
                    renditionWidth={"min(5.5in, 100vw)"}
                    locationChanged={epubcifi => console.log(epubcifi)}
                />
            </div>
        </div>
    </Paper>;
}