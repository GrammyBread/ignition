export enum ItemStatus {
    Published = 1,
    New,
    OnPatreon,
    Unpublished
  }

export interface TableOfContentsChapter {
	title: string;
	sections: string[];
}

export interface TableOfContents {
	chapters: TableOfContentsChapter[];
}

export interface SectionAvailability {
    title: string;
    status: ItemStatus;
}

export interface ChapterAvailability {
    title: string;
    status: ItemStatus;
    sections: SectionAvailability[];
}