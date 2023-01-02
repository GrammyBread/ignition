import { styled } from '@mui/material';
import { EpubHeader } from '../../../../interfaces/epub/epub-reader.interface';
import { Box } from '@mui/system';
import {
    IconDefinition,
    faFacebookF,
    faRedditAlien,
    faTumblr,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";

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

export interface SocialLinkDetails {
    key: string;
    link: string;
    label: string;
    icon: IconDefinition;
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

export function coverSocialLinks(props: EpubHeader) : SocialLinkDetails[]{
    return [
        {
            key: "twitter",
            link: props.twitterShare,
            label: "Share on Twitter",
            icon: faTwitter
        },
        {
            key: "facebook",
            link: props.facebookShare,
            label: "Share on Facebook",
            icon: faFacebookF
        },
        {
            key: "reddit",
            link: props.redditShare,
            label: "Share on Reddit",
            icon: faRedditAlien
        },
        {
            key: "tumblr",
            link: props.tumblrShare,
            label: "Share on Tumblr",
            icon: faTumblr
        }
    ] as SocialLinkDetails[];
}

export const BookHolder = styled(Box)(({
    maxWidth: '100%',
    maxHeight: '100%',
    height: '100vh',
    overflow: 'hidden'
}));