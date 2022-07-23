import { TOCProps } from "../components/TableOfContents/TableOfContents";
import { Section } from "../interfaces/read-metadata.interfaces";
import { ChapterAvailability, ItemStatus, SectionAvailability, TableOfContentsChapter } from '../interfaces/view-data.interfaces';
import DeterminePublishStatus, { PublishStatus } from "./state.mappers";

export interface ChapterInCosmic {
    name: string;
    sections: Section[] | undefined;
    slug: string;
}

export function mapSectionAvailability(section: string, cosmicSections: Section[]): SectionAvailability {
    let cosmicSection = cosmicSections.find((cosmicSection) => {
        cosmicSection.title == section
    })

    if (cosmicSection == undefined) {
        return {
            title: section,
            status: ItemStatus.Unpublished
        } as SectionAvailability;
    }

    let publishStatus = DeterminePublishStatus(cosmicSection.status);
    let currentDate = new Date();
    let patreonPublishDate = cosmicSection.metadata?.patreon_realease_date != undefined ? new Date(cosmicSection.metadata.patreon_realease_date) : undefined;
    if (publishStatus == PublishStatus.Published) {
        return {
            title: section,
            status: ItemStatus.Published,
            slug: cosmicSection.slug
        } as SectionAvailability;
    }

    if (patreonPublishDate != undefined && patreonPublishDate < currentDate) {
        return {
            title: section,
            status: ItemStatus.OnPatreon,
            slug: cosmicSection.slug
        } as SectionAvailability;
    }
    else {
        return {
            title: section,
            status: ItemStatus.Unpublished
        } as SectionAvailability;
    }
}

export function mapChaptersSectionsAvailability(sections: string[], cosmicSections: Section[]): [SectionAvailability[], ItemStatus] {
    let chapterStatus = ItemStatus.Unpublished;

    let sectionAvailabilities = sections.map((section) => {
        let sectionAvailability = mapSectionAvailability(section, cosmicSections)

        chapterStatus = sectionAvailability.status == ItemStatus.Published ||
            sectionAvailability.status == ItemStatus.OnPatreon && chapterStatus != ItemStatus.Published ?
            sectionAvailability.status :
            chapterStatus;

        return sectionAvailability;
    });
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
        name: chapter.title,
        slug: chapter.slug,
        sections: chapter.metadata?.sections != undefined ? chapter.metadata.sections.map((section) => ({
            name: section.title,
            status: section.status,
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

