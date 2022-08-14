import { MakeDefaultUnpublishedItem, TryFindRelatedCosmicItem, MakeDefaultTOCItem } from './shared.mappers';
import { TableOfContentsChapter, TableOfContentsItem } from '../../interfaces/read-metadata.interfaces';
import { Chapter, Section } from "../../interfaces/view-data.interfaces";
import { CleanedCosmicChapter, CleanedCosmicSection } from '../../interfaces/cleaned-types.interface';
import { ItemStatus } from "./state.mappers";
import { MapSection, MakeDefaultTOCSection } from './section.mappers';

function CompleteChapterSetup(chapter: Chapter, sections?: TableOfContentsItem[], key?: number) {
    chapter.sections = sections != undefined ?
        sections.map((section) =>
            MakeDefaultTOCItem(section) as Section)
        :
        new Array<Section>();
    if (key != undefined) {
        chapter.key = key;
    }
    return chapter;
}

function MakeDefaultCosmicChapter(cosmicChapter: CleanedCosmicChapter): Chapter {
    let partialChapter = { ...MakeDefaultUnpublishedItem(cosmicChapter) } as Chapter;
    return CompleteChapterSetup(partialChapter, cosmicChapter.chapter_section_data?.Sections, cosmicChapter.key);
}

export function MakeDefaultTOCChapter(tocChapter: TableOfContentsChapter): Chapter {
    let partialChapter = { ...MakeDefaultTOCItem(tocChapter) } as Chapter;
    return CompleteChapterSetup(partialChapter, tocChapter.Sections, tocChapter.Key);
}

export function MapChapter(chapterData: CleanedCosmicChapter, slugBase: string): Chapter {
    if (chapterData.cleaned_sections != undefined && chapterData.chapter_section_data) {
        const baseSlug = `${slugBase}/${chapterData.slug}`
        let chapterStatus = ItemStatus.Unpublished;
        const mappedSections = chapterData.chapter_section_data.Sections.map(
            (tocSection) => {
                let relatedSecton = TryFindRelatedCosmicItem<CleanedCosmicSection>(tocSection, chapterData.cleaned_sections);
                if (relatedSecton != undefined) {
                    let mappedSection = MapSection(relatedSecton, baseSlug);
                    if (mappedSection.publishStatus > 2 && chapterStatus < 3) {
                        chapterStatus = mappedSection.publishStatus;
                    }
                    return mappedSection;
                }
                return MakeDefaultTOCSection(tocSection) as Section;
            });

        return {
            key: chapterData.key,
            id: chapterData.id,
            header: chapterData.header,
            itemSlug: baseSlug,
            publishStatus: chapterStatus,
            sections: mappedSections
        } as Chapter
    }
    return MakeDefaultCosmicChapter(chapterData)
}