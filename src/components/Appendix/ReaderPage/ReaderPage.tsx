import React, { useRef } from 'react';
import dynamic from "next/dynamic";
import { EpubDetails } from '../../../interfaces/epub/epub-reader.interface';

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

    React.useEffect(() => {
        const newTouchStatus = detectIfTouchDevice();
        if (newTouchStatus != isTouchDevice) {
            setIsTouchDevice(newTouchStatus);
        }
    }, [isTouchDevice]);


    return isTouchDevice ?
        <TouchScreenBook {...props}></TouchScreenBook> :
        <DesktopBook {...props}></DesktopBook>;
}