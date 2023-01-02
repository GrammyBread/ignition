import {
    IconDefinition
} from "@fortawesome/free-brands-svg-icons";
import { EpubReaderType } from './enums';

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
