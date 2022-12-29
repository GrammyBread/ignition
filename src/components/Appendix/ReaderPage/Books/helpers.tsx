import { styled } from '@mui/material';
import { EpubDetails } from '../../../../interfaces/epub/epub-reader.interface';
import { Box } from '@mui/system';

export enum Orientiation {
    landscape,
    portrait
}

export enum EpubReaderType {
    fullWidth,
    halfPageWidth,
    fullPageWidth
}

export interface ReaderDisplayAction {
    type: EpubReaderType
}

export interface ReaderState {
    largeEpub: string;
    smallEpub: string;
    currentScript: string;
    setting: EpubReaderType;
}

export function readerReducer(state: ReaderState, action: ReaderDisplayAction) {
    const { type } = action;
    if (type != state.setting) {
        return {
            ...state,
            currentScript: type === EpubReaderType.fullPageWidth ? state.largeEpub : state.smallEpub,
            setting: type
        }
    }
    else return state;
}

export const BookHolder = styled(Box)(({
    maxWidth: '100%',
    maxHeight: '100%',
    height: '100vh',
    overflow: 'hidden'
}));