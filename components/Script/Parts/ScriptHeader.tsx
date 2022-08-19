import * as React from 'react';
import { Paper } from '@mui/material';
import Styles from './Table.module.scss';
import Image from 'next/image';

export interface ScriptHeaderProps {
    headerUrl: string;
    title: string;
}

export function ScriptHeader(props: ScriptHeaderProps): JSX.Element {
    return (
        <Paper className={Styles.contents} elevation={1} >
            <Image aria-label={props.title} src={props.headerUrl} layout='fill' />
        </Paper >
    );
}