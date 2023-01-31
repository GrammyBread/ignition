import React from 'react';
import DesktopBook from './Books/DesktopBook/DesktopBook';
import TouchScreenBook from './Books/TouchScreenBook/TouchScreenBook';
import { EpubDetails } from '../../interfaces/epub/epub-reader.interface';

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