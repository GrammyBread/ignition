import { BasicObject, ChapterMetadata, PartMetadata, SectionMetadata } from "./read-metadata.interfaces";

export interface CleanedCosmicPart extends PartMetadata, BasicObject {
    cleaned_chapters: CleanedCosmicChapter[]
}

export interface CleanedCosmicChapter extends ChapterMetadata, BasicObject {
    cleaned_sections: CleanedCosmicSection[]
}

export interface CleanedCosmicSection extends SectionMetadata, BasicObject {
}