import { BasicObject, ChapterMetadata, Resource, PartMetadata, SectionMetadata } from "./read-metadata.interfaces";
import { Story } from "./view-data.interfaces";

export interface CleanedCosmicPart extends PartMetadata, BasicObject {
    cleaned_chapters: CleanedCosmicChapter[]
}

export interface CleanedCosmicChapter extends ChapterMetadata, BasicObject {
    cleaned_sections: CleanedCosmicSection[]
}

export interface CleanedCosmicSection extends SectionMetadata, BasicObject {
}

export interface CleanedNavigation {
    data: Story;
    logo: Resource;
    domain: string;
}