import { ItemStatus } from "../mappers/state.mappers";

export interface TableOfContentsChapter {
    Title: string;
    Sections: string[];
}

export interface TableOfContentsPart {
    Chapters: TableOfContentsChapter[];
}

export interface SectionAvailability {
    title: string;
    status: ItemStatus;
    slug?: string;
    releaseDate?: Date;
}

export interface ChapterAvailability {
    title: string;
    status: ItemStatus;
    slug?: string;
    sections: SectionAvailability[];
}