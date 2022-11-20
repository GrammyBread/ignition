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

const ReadingArea = styled(Box)(({ theme }) => ({
    width: `min(calc(5.5in + 20vw), 120vw)`
}));

const CoverArea = styled(Box)(({ theme }) => ({
    width: `calc(80vw - ${theme.spacing(3)})`,
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
    const isSmallScreen = useMediaQuery(theme.breakpoints.not('xl'));

    React.useEffect(() => {
        const small = isTest ? testSmallScript : smallScript;
        const large = isTest ? testLargeScript : largeScript;
        setScriptPdf(isSmallScreen ? small : large);
    }, [isSmallScreen, isTest]);

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