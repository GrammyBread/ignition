import { CosmicPart, CosmicReadData } from '../../interfaces/read/read-metadata.interfaces';
import { Story, Part, Chapter } from '../../interfaces/read/view-data.interfaces';
import { MapChapter, MakeDefaultTOCChapter } from './chapter.mappers';
import { MakeDefaultUnpublishedItem, TryFindRelatedCosmicItem } from './shared.mappers';
import { IdentifyNewestSection, ItemStatus } from './state.mappers';
import { CleanedCosmicPart, CleanedCosmicChapter } from '../../interfaces/read/cleaned-types.interface';
import { CleanPart } from '../cleaner.mapper';
import { ParsedUrlQuery } from 'querystring';

function MakeDefaultPart(part: CosmicPart, key?: number): Part {
    let partialPart = { ...MakeDefaultUnpublishedItem(part) } as Part;
    partialPart.chapters = part.metadata?.table_of_contents_data.Chapters != undefined ?
        part.metadata.table_of_contents_data.Chapters.map((chapter) => MakeDefaultTOCChapter(chapter) as Chapter)
        :
        new Array<Chapter>();
    if (key != undefined) {
        partialPart.key = key;
    }
    return partialPart;
}

export function MapPart(partData: CleanedCosmicPart): Part {
    if (partData.cleaned_chapters != undefined && partData.table_of_contents_data != undefined) {
        const baseSlug = {
            partslug: partData.slug
        } as ParsedUrlQuery;
        let partStatus = ItemStatus.Unpublished;
        const mappedChapters = partData.table_of_contents_data.Chapters.map(
            (tocChapter) => {
                let relatedChapter = TryFindRelatedCosmicItem<CleanedCosmicChapter>(tocChapter, partData.cleaned_chapters);
                if (relatedChapter != undefined) {
                    let mappedChapter = MapChapter(relatedChapter, baseSlug);
                    if (mappedChapter.publishStatus > 2 && partStatus < 3) {
                        partStatus = mappedChapter.publishStatus;
                    }
                    return mappedChapter;
                }
                return MakeDefaultTOCChapter(tocChapter) as Chapter;
            });

        return {
            key: partData.key,
            id: partData.id,
            header: partData.title,
            fullPath: baseSlug,
            publishStatus: partStatus,
            chapters: mappedChapters
        } as Part
    }
    return MakeDefaultPart(partData, partData.key);
}

export default function MapParts(siteData: CosmicReadData): Story {
    if (siteData.published_parts != undefined && siteData.published_parts.length > 0) {
        let story = {
            parts: siteData.published_parts.map((part) => {
                let cleanedPart = CleanPart(part);
                return cleanedPart != undefined ?
                    MapPart(cleanedPart)
                    :
                    MakeDefaultPart(part);
            })
        } as Story;

        let [partIndex, chapterIndex, sectionIndex] = IdentifyNewestSection(story.parts)
        if (sectionIndex > -1 && chapterIndex > -1 && partIndex > -1) {
            story.parts[partIndex].publishStatus = ItemStatus.New;
            story.parts[partIndex].chapters[chapterIndex].publishStatus = ItemStatus.New;
            story.parts[partIndex].chapters[chapterIndex].sections[sectionIndex].publishStatus = ItemStatus.New;
        }

        return story;
    }

    return {
        parts: Array<Part>()
    } as Story;
}

