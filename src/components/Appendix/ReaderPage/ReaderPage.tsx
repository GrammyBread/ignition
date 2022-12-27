import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import dynamic from "next/dynamic";
import { Box, useMediaQuery } from "@mui/material";
import { EpubDetails, EpubHeader } from '../../../interfaces/epub/epub-reader.interface';
import { BookProperties, EpubReaderType } from "./Books/helpers";
import { Container } from '@mui/system';

const TouchScreenBook = dynamic(() => import("./Books/TouchScreenBook/TouchScreenBook"), {
    ssr: false
});

const DesktopBook = dynamic(() => import("./Books/DesktopBook/DesktopBook"), {
    ssr: false
});

function detectIfTouchDevice() {
    return typeof window && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
}

export default function ReaderPage(props: EpubDetails): JSX.Element {
    const [isTouchDevice, setIsTouchDevice] = React.useState(true);
    const bookHolder = useRef(null);

    React.useEffect(() => {
        const newTouchStatus = detectIfTouchDevice();
        if (newTouchStatus != isTouchDevice) {
            setIsTouchDevice(newTouchStatus);
        }
    }, [isTouchDevice]);

    const bookProps = {
        ...props,
        reference: bookHolder
    } as BookProperties;

    const elem = isTouchDevice ?
        <TouchScreenBook {...bookProps}></TouchScreenBook> :
        <DesktopBook {...bookProps}></DesktopBook>;

    const headerProps = {
        ...props,
    } as EpubHeader;

    return <Box ref={bookHolder} sx={{
        maxWidth: '100%',
        maxHeight: '100%',
        height: '100vh',
        overflow: 'hidden'
    }}>
        {elem}
    </Box>;
}