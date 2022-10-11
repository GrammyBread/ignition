import { NavPart } from "./nav-data.interfaces";
import { 
    BasicReadObject, 
    ChapterMetadata, 
    PartMetadata, 
    SectionMetadata } from "./read-metadata.interfaces";

export interface CleanedCosmicPart extends PartMetadata, BasicReadObject {
    cleaned_chapters: CleanedCosmicChapter[]
}

export interface CleanedCosmicChapter extends ChapterMetadata, BasicReadObject {
    cleaned_sections: CleanedCosmicSection[]
}

export interface CleanedCosmicSection extends SectionMetadata, BasicReadObject {
}

export interface CleanedNavigation {
    data: NavPart[];
    logoUrl: string;
    domain: string;
}