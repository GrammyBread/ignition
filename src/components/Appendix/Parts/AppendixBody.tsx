import * as React from 'react';
import dynamic from "next/dynamic";
import { Paper, Stack, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { grey } from '@mui/material/colors';
import { Resource } from '../../../interfaces/read/read-metadata.interfaces';
const PDFViewer = dynamic(() => import("../../CustomPdfReader/CustomPdfReader"), {
    ssr: false
});

const BodyPaper = styled(Paper)(({ theme }) => ({
    margin: 'auto',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
    color: theme.palette.mode === "dark" ? "white" : "black",
    fontFamily: "arial",
    lineHeight: "1.25rem",
    [theme.breakpoints.between('xs', 'sm')]: {
        width: '100%',
        padding: "1vw"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        width: '100%',
        padding: "1vw"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        width: '90%',
        maxWidth: '8.5in',
        padding: ".5in"
    },
    [theme.breakpoints.between('lg', 'xl')]: {
        maxWidth: '8.5in',
        padding: ".5in"
    },
    [theme.breakpoints.up('xl')]: {
        maxWidth: '8.5in',
        padding: ".5in"
    },
    '& table': {
        backgroundColor: theme.palette.mode === "dark" ? "white" : grey[200],
        color: theme.palette.mode === "dark" ? "black" : "black",
        border: "solid black 2pt !important",
        margin: "auto !important"
    },
    '& tr': {
        backgroundColor: theme.palette.mode === "dark" ? "white" : grey[200],
        color: theme.palette.mode === "dark" ? "black" : "black",
        border: "solid black 2pt !important",
    },
    '& td': {
        backgroundColor: theme.palette.mode === "dark" ? "white" : grey[200],
        color: theme.palette.mode === "dark" ? "black" : "black",
        border: "solid black 2pt !important",
    }
}));

interface AppendixBodyProps {
    smallPdf: Resource;
    largePdf: Resource;
}

export function AppendixBody({smallPdf, largePdf }: AppendixBodyProps): JSX.Element {
    const [scriptPdf, setScriptPdf] = React.useState(smallPdf);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'md'));

    React.useEffect(() => {
            setScriptPdf(isSmallScreen ? smallPdf : largePdf);
    }, [isSmallScreen, smallPdf, largePdf]);


    return <PDFViewer
        pdfFile={scriptPdf}
    />
}