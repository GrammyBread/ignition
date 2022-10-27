import * as React from 'react';
import { AppendixHeader, AppendixHeaderProps } from './Parts/AppendixHeader';
import Styles from '../../styles/shared.module.scss';
import AppendixStyles from './AppendixDoc.module.scss';
import { Stack } from '@mui/material';
import { TextBodyProps } from '../Script/Parts/ScriptBody';
import {AppendixDocument} from '../../interfaces/appendices/documents.interface';
import { AppendixBody } from './Parts/AppendixBody';

export interface AppendixDocProps {
    doc: AppendixDocument;
    fullURL: string;
}

export default function AppendixDocComponent(props: AppendixDocProps) {
    const headerProps = {
        content: props.doc.metadata.description,
        title: props.doc.title,
        url: props.fullURL
    } as AppendixHeaderProps

    const bodyProps = {
        body: props.doc.metadata.large_html,
        smallScript: props.doc.metadata.small_html
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
            <AppendixHeader {...headerProps} ></AppendixHeader>
            <AppendixBody {...bodyProps}></AppendixBody>
        </Stack>
    </React.Fragment>

}