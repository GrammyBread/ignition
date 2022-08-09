import { ItemStatus } from "../mappers/state.mappers";
import { BasicMetadata, BasicObject } from "./read-metadata.interfaces";


export interface TableOfContentsItem {    
    Title: string;
    Key: number;
}

export interface TableOfContentsChapter extends TableOfContentsItem {
    Sections: TableOfContentsItem[];
}

export interface TableOfContentsPart {
    Chapters: TableOfContentsChapter[];
}

export interface SectionAvailability extends BasicMetadata {
    releaseDate?: Date;
    publishStatus: ItemStatus;
    slug: string;
}

export interface ChapterAvailability extends BasicMetadata {
    sections: SectionAvailability[];
    publishStatus: ItemStatus;
}