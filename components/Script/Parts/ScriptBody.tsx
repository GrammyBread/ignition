import * as React from 'react';
import { Paper } from '@mui/material';
import Styles from './Table.module.scss';

export interface ScriptBodyProps {
    body: string;
}

export function ScriptBody(props: ScriptBodyProps): JSX.Element {
    return (
        <Paper className={Styles.contents} elevation={1} >
            <div dangerouslySetInnerHTML={{ __html: props.body }}></div>
        </Paper >
    );
}