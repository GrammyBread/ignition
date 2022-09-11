import * as React from 'react';
import { Paper, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export interface ScriptBodyProps {
    body: string;
}

interface PropertyReplacements {
    normalVal: RegExp;
    smallerVal: string;
}

const BodyPaper = styled(Paper)(({ theme }) => ({
    margin: 'auto',
    padding: theme.spacing(1),
    [theme.breakpoints.between('xs', 'sm')]: {
        padding: '5vw',
        width: '100%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
        padding: '10vw',
        width: '100%'
    },
    [theme.breakpoints.between('md', 'lg')]: {
        padding: '5vw 10vw 5vw 10vw',
        width: '80%'
    },
    [theme.breakpoints.between('lg', 'xl')]: {
        padding: '2vw 7vw 2vw 7vw',
        width: '70%'
    },
    [theme.breakpoints.up('xl')]: {
        padding: '5vw 10vw 5vw 10vw',
        width: '60%'
    }
}));

function MakeScriptSmallScreenCompatible(body: string): string {
    return body.replaceAll(/(\r\n|\r|\n)/gmi, " ")
    .replaceAll(/1.5in/gmi, ".5in")
    .replaceAll(/1.0in/gmi, ".5in")
    .replaceAll(/2.0in/gmi, "1in");
}

export function ScriptBody(props: ScriptBodyProps): JSX.Element {
    const [scriptBody, setScriptBody] = React.useState(props.body);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const smallScript = MakeScriptSmallScreenCompatible(props.body);    
   
    React.useEffect(() => {
        setScriptBody(isSmallScreen ? smallScript : props.body);
    }, [isSmallScreen]);

    return (
        <BodyPaper elevation={1} >
            <div dangerouslySetInnerHTML={{ __html: scriptBody }}></div>
        </BodyPaper >
    );
}