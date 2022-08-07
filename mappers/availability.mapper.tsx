import { TOCProps } from "../components/TableOfContents/TableOfContents";
import { Section } from "../interfaces/read-metadata.interfaces";
import { ChapterAvailability, SectionAvailability, TableOfContentsChapter } from '../interfaces/view-data.interfaces';
import { DetermineSectionStatus, ItemStatus, IdentifyNewestSection } from "./state.mappers";

export interface ChapterInCosmic {
    name: string;
    sections: SectionInCosmic[] | undefined;
    slug: string;
}

export interface SectionInCosmic {
    name: string;
    status: string;
    slug: string;
    patreonRelease: string;
    publicRelease: string;
}

export function mapSectionAvailability(section: string, cosmicSections: SectionInCosmic[]): SectionAvailability {
    let cosmicSection = cosmicSections.find((cosmicSection) => {
        cosmicSection.name == section
    })

    if (cosmicSection == undefined) {
        return {
            title: section,
            status: ItemStatus.Unpublished,
            releaseDate: undefined
        } as SectionAvailability;
    }

    let itemStatus = DetermineSectionStatus(cosmicSection.status, cosmicSection.patreonRelease, cosmicSection.publicRelease);
    
    return {
        title: section,
        status: itemStatus,
        slug: cosmicSection.slug,
        releaseDate: cosmicSection.publicRelease ? new Date(cosmicSection.publicRelease) : undefined
    } as SectionAvailability;
}

export function mapChaptersSectionsAvailability(sections: string[], cosmicSections: SectionInCosmic[]): [SectionAvailability[], ItemStatus] {
    let chapterStatus = ItemStatus.Unpublished;

    let sectionAvailabilities = sections.map((section) => {
        let sectionAvailability = mapSectionAvailability(section, cosmicSections);
        chapterStatus = sectionAvailability.status == ItemStatus.Published ||
            sectionAvailability.status == ItemStatus.PatreonOnly && chapterStatus != ItemStatus.Published ?
            sectionAvailability.status :
            chapterStatus;

        return sectionAvailability;
    });
    
    let newestSection = IdentifyNewestSection(sectionAvailabilities);
    if(newestSection > -1) sectionAvailabilities[newestSection].status = ItemStatus.New;
    return [sectionAvailabilities, chapterStatus];
}

export function mapChapterAvailability(chapter: TableOfContentsChapter, cosmicChapters: ChapterInCosmic[]): ChapterAvailability {
    let relatedCosmicChapter = cosmicChapters.find((cosmicChapter) => {
        return cosmicChapter.name == chapter.Title
    })

    if (relatedCosmicChapter == undefined || relatedCosmicChapter.sections == undefined) {
        return {
            title: chapter.Title,
            status: ItemStatus.Unpublished,
            sections: chapter.Sections.map((section) => ({
                title: section,
                status: ItemStatus.Unpublished
            } as SectionAvailability))
        } as ChapterAvailability
    }
    else {
        let [sectionAvailability, chapterStatus] = mapChaptersSectionsAvailability(chapter.Sections, relatedCosmicChapter.sections)
        return {
            title: chapter.Title,
            status: chapterStatus,
            sections: sectionAvailability,
            slug: relatedCosmicChapter.slug
        } as ChapterAvailability
    }
}

export function mapTOCChaptersAvailability(tocData: TOCProps): ChapterAvailability[] {
    let availableChaptersInCosmic = tocData.partDetails.metadata?.chapters.map((chapter) => ({
        name: chapter.metadata?.header,
        slug: chapter.slug,
        sections: chapter.metadata?.sections != undefined ? chapter.metadata.sections.map((section) => ({
            name: section.metadata?.header,
            status: section.status,
            patreonRelease: section.metadata?.patreon_release_date,
            publicRelease: section.metadata?.public_release_date,
            slug: section.slug
        })) : undefined
    } as ChapterInCosmic))

    return availableChaptersInCosmic === undefined || availableChaptersInCosmic.length < 1 ?
        tocData.data.Chapters.map((chapter) => ({
            title: chapter.Title,
            status: ItemStatus.Unpublished,
            sections: chapter.Sections.map((section) => ({
                title: section,
                status: ItemStatus.Unpublished
            } as SectionAvailability))
        } as ChapterAvailability))
        :
        //@ts-ignore
        tocData.data.Chapters.map((chapter) => mapChapterAvailability(chapter, availableChaptersInCosmic))
}

