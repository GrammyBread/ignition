import * as React from 'react';
import { Script } from '../../interfaces/read/read-metadata.interfaces';
import Image from 'next/image';
import { ScriptHeader, ScriptHeaderProps } from './Parts/ScriptHeader';
import { ScriptBody, ScriptBodyProps } from './Parts/ScriptBody';
import Styles from '../../styles/shared.module.scss';
import ScriptStyles from './Script.module.scss';
import { Stack } from '@mui/material';
import { Box, Container } from '@mui/system';

export interface ScriptProps {
    script: Script;
    header: string;
    fullURL: string;
}

export default function ScriptComponent(props: ScriptProps) {
    const data = props.script.metadata;
    const headerProps = {
        headerUrl: data.header_image.url,
        title: data.title
    } as ScriptHeaderProps

    const bodyProps = {
        body: props.script.content
    } as ScriptBodyProps

    return <React.Fragment>
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={4}
            sx={{
                fontSize:"1rem"
            }}>
            <ScriptHeader {...headerProps} ></ScriptHeader>
            <ScriptBody {...bodyProps}></ScriptBody>
        </Stack>
    </React.Fragment>

}