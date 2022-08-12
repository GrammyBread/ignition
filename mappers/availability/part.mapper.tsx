import { CosmicPart, CosmicSiteData, TableOfContentsPart, BasicMetadata, BasicObject } from '../../interfaces/read-metadata.interfaces';
import { Story, Part, Chapter, ReadItem } from '../../interfaces/view-data.interfaces';
import { MapChapter, MakeDefaultChapter } from './chapter.mapper';
import { MakeDefaultUnpublishedItem, TryFindRelatedCosmicItem, MakeDefaultTOCItem } from './shared';
import { ItemStatus } from './state.mappers';
import { CleanedCosmicPart, CleanedCosmicChapter } from '../../interfaces/cleaned-types.interface';
import { CleanPart } from '../cleaner.mapper';

function MakeDefaultPart(part: BasicObject, key?: number): Part {
    let partialPart = { ...MakeDefaultUnpublishedItem(part) } as Part;
    partialPart.chapters = Array<Chapter>();
    if (key != undefined) {
        partialPart.key = key;
    }
    return partialPart;
}

export function MapPart(partData: CleanedCosmicPart, slugBase: string): Part {
    if(partData.cleaned_chapters != undefined && partData.table_of_contents_data != undefined) {
            const baseSlug = `${slugBase}/${partData.slug}`;
            let partStatus = ItemStatus.Unpublished;
            let mappedChapters = partData.table_of_contents_data.Chapters.map(
                (tocChapter) => {
                let relatedChapter = TryFindRelatedCosmicItem<CleanedCosmicChapter>(tocChapter, partData.cleaned_chapters);
                if(relatedChapter != undefined)
                {
                    let mappedChapter = MapChapter(relatedChapter, baseSlug);
                    if(mappedChapter.publishStatus > 2 && partStatus < 3)
                    {
                        partStatus = mappedChapter.publishStatus;
                    }
                    return mappedChapter;
                }
                return MakeDefaultTOCItem(tocChapter);
            });

            return {
                key: partData.key,
                id: partData.id,
                header: partData.title,
                itemSlug: baseSlug,
                publishStatus: partStatus,
                chapters: mappedChapters
            } as Part
        }
    
    return MakeDefaultPart(partData);
}

export default function MapParts(siteData: CosmicSiteData): Story {
    if (siteData.published_parts != undefined && siteData.published_parts.length > 0) {
        const readBaseSlug = "/read";
        return {
            parts: siteData.published_parts.map((part) =>
            {
                let cleanedPart = CleanPart(part);
                return cleanedPart != undefined ?
                MapPart(cleanedPart, readBaseSlug)
                :
                MakeDefaultPart(part);
            })
        } as Story;
    }

    return {
        parts: Array<Part>()
    } as Story;
}

