import * as React from 'react';
import { Script } from '../../interfaces/read/read-metadata.interfaces';
import { ScriptHeader, ScriptHeaderProps } from './Parts/ScriptHeader';
import { ScriptBody, TextBodyProps } from './Parts/ScriptBody';
import { Stack } from '@mui/material';

export interface ScriptProps {
    script: Script;
    header: string;
    fullURL: string;
}

export default function ScriptComponent(props: ScriptProps) {
    const data = props.script.metadata;
    const headerProps = {
        headerImage: data.header_image,
        title: data.title
    } as ScriptHeaderProps

    const bodyProps = {
        body: props.script.content,
        smallScript: props.script.metadata.small_script
    } as TextBodyProps

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