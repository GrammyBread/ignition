import { EpubHeader } from "../../../../interfaces/epub/epub-reader.interface";
import { EpubReaderType } from "./enums";
import { ReaderDisplayAction, ReaderState, SocialLinkDetails } from "./interfaces";
import {
    faFacebookF,
    faRedditAlien,
    faTumblr,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";

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
