import { BasicMetadata, BasicObject, TableOfContentsItem } from "../../interfaces/read-metadata.interfaces";
import { ReadItem } from "../../interfaces/view-data.interfaces";
import { ItemStatus } from "./state.mappers";

export function TryFindRelatedCosmicItem<T extends BasicMetadata>(tocItem: TableOfContentsItem, cosmicItems: T[]): T | undefined {
    return cosmicItems.find((item) => item.key == tocItem.Key);
}

export function MakeDefaultTOCItem(tocItem: TableOfContentsItem): ReadItem {
    return {
        key: tocItem.Key,
        header: tocItem.Title,
        publishStatus: ItemStatus.Unpublished
    } as ReadItem;
}

export function MakeDefaultUnpublishedItem(item: BasicObject): ReadItem {
    return  {
        header: item.title,
        publishStatus: ItemStatus.Unpublished,
        itemSlug: item.slug,
        id: item.id
    } as ReadItem;

}

