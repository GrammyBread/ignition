import * as React from 'react';
import dynamic from "next/dynamic";
import { AppendixHeader, AppendixHeaderProps } from './Parts/AppendixHeader';
import AppendixStyles from './AppendixDoc.module.scss';
import { styled, useMediaQuery, useTheme } from '@mui/material';
import { AppendixDocument } from '../../interfaces/appendices/documents.interface';
import { Resource } from '../../interfaces/read/read-metadata.interfaces';
import { Box } from '@mui/system';

export interface AppendixDocProps {
    doc: AppendixDocument;
    fullURL: string;
    isTestEnvironment?: boolean;
}

const ReadingArea = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'width',
})<{width?: string}>(({ theme, width }) => ({
    width: width || `min(calc(5.5in + 20vw), 120vw)`
}));

const CoverArea = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'width',
})<{width?: string}>(({ theme, width }) => ({
    width: width || `calc(80vw - ${theme.spacing(3)})`,
    margin: `0 ${theme.spacing(3)}`
}));

const CustomReader = dynamic(() => import("../CustomReader/CustomerReader"), {
    ssr: false
});

export default function AppendixDocComponent({
    doc,
    fullURL,
    isTestEnvironment }: AppendixDocProps) {
    const testSmallScript = {
        url: "/exampleDocs/Appendix_1_Descriptors_Mobile.epub",
        imgix_url: ""
    } as Resource;
    const testLargeScript = {
        url: "/exampleDocs/Appendix_1_Descriptors.epub",
        imgix_url: ""
    } as Resource;
    const smallScript = doc.metadata.small_pdf;
    const largeScript = doc.metadata.large_pdf;
    const isTest = isTestEnvironment;

    const [script, setScriptPdf] = React.useState(testSmallScript);
    const theme = useTheme();
    const isLargerScreen = useMediaQuery("(min-width: 10in)");
    const isSmallerScreen = useMediaQuery("(min-width: 6in) and (max-width: 10in)");
    const isMobilePortrait = useMediaQuery("(max-width: 6in)");

    const useSmallScript = isSmallerScreen || isMobilePortrait;

    React.useEffect(() => {
        const small = isTest ? testSmallScript : smallScript;
        const large = isTest ? testLargeScript : largeScript;
        setScriptPdf(useSmallScript ? small : large);
    }, [useSmallScript, isTest]);

    const headerProps = {
        content: doc.metadata.description,
        title: doc.title,
        url: fullURL
    } as AppendixHeaderProps;
    const bottomMargin = theme.spacing(3);

    return <Box className={AppendixStyles.ReaderBody}>
        <div className={AppendixStyles.SlidesHolder}>
            <div className={AppendixStyles.ReaderSlides}>
                <CoverArea><AppendixHeader {...headerProps} ></AppendixHeader></CoverArea>
                <ReadingArea>
                    <CustomReader
                        title={doc.title}
                        EpubDoc={script}
                    />
                </ReadingArea>
            </div>
        </div>
    </Box>;
}