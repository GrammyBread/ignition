import { MakeDefaultUnpublishedItem, TryFindRelatedCosmicItem, MakeDefaultTOCItem } from './shared.mappers';
import { TableOfContentsChapter, TableOfContentsItem } from '../../interfaces/read/read-metadata.interfaces';
import { Chapter, Section } from "../../interfaces/read/view-data.interfaces";
import { CleanedCosmicChapter, CleanedCosmicSection } from '../../interfaces/read/cleaned-types.interface';
import { ItemStatus } from "./state.mappers";
import { MapSection, MakeDefaultTOCSection } from './section.mappers';
import { ParsedUrlQuery } from 'querystring';

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

export function MapChapter(chapterData: CleanedCosmicChapter, partSlug: ParsedUrlQuery): Chapter {
    if (chapterData.cleaned_sections != undefined && chapterData.chapter_section_data) {
        const parsedURL = {
            ...partSlug,
            chapterslug: chapterData.slug
        } as ParsedUrlQuery;
        let chapterStatus = ItemStatus.Unpublished;
        const mappedSections = chapterData.chapter_section_data.Sections.map(
            (tocSection) => {
                let relatedSecton = TryFindRelatedCosmicItem<CleanedCosmicSection>(tocSection, chapterData.cleaned_sections);
                if (relatedSecton != undefined) {
                    let mappedSection = MapSection(relatedSecton, parsedURL);
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
            fullPath: parsedURL,
            slug: chapterData.slug,
            publishStatus: chapterStatus,
            sections: mappedSections
        } as Chapter
    }
    return MakeDefaultCosmicChapter(chapterData)
}