import * as React from 'react';
import { AppendixHeader, AppendixHeaderProps } from './Parts/AppendixHeader';
import Styles from '../../styles/shared.module.scss';
import AppendixStyles from './AppendixDoc.module.scss';
import { Stack } from '@mui/material';
import { TextBodyProps } from '../Script/Parts/ScriptBody';
import {AppendixDocument} from '../../interfaces/appendices/documents.interface';
import { AppendixBody } from './Parts/AppendixBody';
import { Resource } from '../../interfaces/read/read-metadata.interfaces';

export interface AppendixDocProps {
    doc: AppendixDocument;
    fullURL: string;
    isTest: boolean;
}

export default function AppendixDocComponent(props: AppendixDocProps) {
    const headerProps = {
        content: props.doc.metadata.description,
        title: props.doc.title,
        url: props.fullURL
    } as AppendixHeaderProps
    
    const testSmallPDF = {
        url: "/exampleDocs/SmallExample.pdf",
        imgix_url: ""
    } as Resource;

    const testLargePDF = {
        url: "/exampleDocs/SmallExample.pdf",
        imgix_url: ""
    } as Resource;

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
            <AppendixBody 
                largePdf={props.isTest ? testLargePDF : props.doc.metadata.large_pdf}
                smallPdf={props.isTest ? testSmallPDF : props.doc.metadata.small_pdf}
            ></AppendixBody>
        </Stack>
    </React.Fragment>

}