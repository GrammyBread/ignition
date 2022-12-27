import { EpubDetails } from '../../../../interfaces/epub/epub-reader.interface';

export interface BookProperties extends EpubDetails {
    reference: React.MutableRefObject<null>;
}

export enum Orientiation {
    landscape,
    portrait
}

export enum EpubReaderType {
    fullWidth,
    halfPageWidth,
    fullPageWidth
}