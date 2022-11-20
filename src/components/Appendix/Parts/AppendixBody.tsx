import * as React from 'react';
import dynamic from "next/dynamic";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Resource } from '../../../interfaces/read/read-metadata.interfaces';

interface AppendixBodyProps {
    smallPdf: Resource;
    largePdf: Resource;
    title: string;
}

const CustomReader = dynamic(() => import("../../CustomReader/CustomerReader"), {
    ssr: false
});

export function  AppendixBody({ smallPdf, largePdf, title }: AppendixBodyProps): JSX.Element {
    const [scriptPdf, setScriptPdf] = React.useState(smallPdf);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.not('xl'));

    React.useEffect(() => {
        setScriptPdf(isSmallScreen ? smallPdf : largePdf);
    }, [isSmallScreen, smallPdf, largePdf]);
    const padding = theme.spacing(6)

    return <CustomReader
            title={title}
            EpubDoc={scriptPdf}
        />;

}