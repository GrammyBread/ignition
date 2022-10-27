import { CleanedCosmicPart, CleanedCosmicChapter, CleanedCosmicSection } from '../interfaces/read/cleaned-types.interface';
import { CosmicChapter, CosmicPart, CosmicSection } from "../interfaces/read/read-metadata.interfaces";

export function CleanPart(part: CosmicPart): CleanedCosmicPart | undefined {
    if (part.metadata != undefined) {
        return {
            ...part.metadata,
            id: part.id,
            slug: part.slug,
            title: part.title,
            status: part.status,
            cleaned_chapters: part.metadata.chapters.map((chapter) => CleanChapter(chapter)).filter((chapter) => chapter != undefined)
        } as CleanedCosmicPart;
    }

    return undefined;
}

export function CleanChapter(chapter: CosmicChapter): CleanedCosmicChapter | undefined {
    if (chapter.metadata != undefined) {
        return {
            ...chapter.metadata,
            id: chapter.id,
            slug: chapter.slug,
            title: chapter.title,
            status: chapter.status,
            cleaned_sections: chapter.metadata.sections.map((section) => CleanSection(section)).filter((section) => section != undefined)
        } as CleanedCosmicChapter;
    }

    return undefined;
}

export function CleanSection(section: CosmicSection): CleanedCosmicSection | undefined {
    if (section.metadata != undefined) {
        return {
            ...section.metadata,
            id: section.id,
            slug: section.slug,
            title: section.title,
            status: section.status
        } as CleanedCosmicSection;
    }
    
    return undefined;
}