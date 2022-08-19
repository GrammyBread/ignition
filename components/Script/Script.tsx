import * as React from 'react';
import { Script } from '../../interfaces/read/read-metadata.interfaces';
import Image from 'next/image';
import {ScriptHeader, ScriptHeaderProps } from './Parts/ScriptHeader';
import {ScriptBody, ScriptBodyProps } from './Parts/ScriptBody';

export interface ScriptProps {
    script: Script;
    header: string;
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
        <ScriptHeader {...headerProps} ></ScriptHeader>
        <ScriptBody {...bodyProps}></ScriptBody>
        {
            data.script_image.url &&
            <Image src={data.script_image.url} />
        }
    </React.Fragment>

}