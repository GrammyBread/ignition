import * as React from 'react';
import { Paper } from '@mui/material';
import Styles from './Table.module.scss';
import { Script } from '../../interfaces/read-metadata.interfaces';

export interface ScriptProps {
    script: Script;
    header: string;
}

export default function Scripts(props: ScriptProps) {
    <Paper className={Styles.contents} elevation={0} >
        {props.header}
    </Paper >
}