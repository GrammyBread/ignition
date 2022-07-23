export enum ItemStatus {
    Published = 1,
    New,
    OnPatreon,
    Unpublished
}

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
}

export interface ChapterAvailability {
    title: string;
    status: ItemStatus;
    slug?: string;
    sections: SectionAvailability[];
}