import * as React from 'react';
import { Paper, Stack, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { grey } from '@mui/material/colors';
import Styles from '../Script.module.scss';

export interface TextBodyProps {
    body: string;
    smallScript: string;
}

const BodyPaper = styled(Paper)(({ theme }) => ({
    margin: 'auto',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
    color: theme.palette.mode === "dark" ? "white" : "black",
    fontFamily: "arial",
    lineHeight: "1.25rem",
    [theme.breakpoints.between('xs', 'sm')]: {
        maxWidth: `calc(100vw - ${theme.spacing(6)})`
    },
    [theme.breakpoints.between('sm', 'md')]: {
        maxWidth: `calc(100vw - ${theme.spacing(6)})`
    },
    [theme.breakpoints.between('md', 'lg')]: {
        width: '90%',
        maxWidth: '8.5in'
    },
    [theme.breakpoints.between('lg', 'xl')]: {
        maxWidth: '8.5in'
    },
    [theme.breakpoints.up('xl')]: {
        maxWidth: '8.5in'
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


export function ScriptBody(props: TextBodyProps): JSX.Element {
    const [scriptBody, setScriptBody] = React.useState(props.body);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    React.useEffect(() => {
        setScriptBody(isSmallScreen ? props.smallScript : props.body);
    }, [isSmallScreen, props.smallScript, props.body]);

    const fades = scriptBody.split('[insrtPB]');

    return <Stack spacing={10}>
        {
            fades.map((script, index) => {

                const cuts = scriptBody.split('[insrtLB]');
                return <Stack spacing={5} key={index}>
                    {
                        cuts.map((cut, cindex) =>
                            <BodyPaper elevation={1} key={cindex}>
                                <div className={Styles.scriptBody} dangerouslySetInnerHTML={{ __html: cut }}></div>
                            </BodyPaper >)
                    }
                </Stack>
            }
            )
        }
    </Stack>
}