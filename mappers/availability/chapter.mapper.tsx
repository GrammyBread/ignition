import { MakeDefaultUnpublishedItem } from "./shared";
import { BasicObject, CosmicChapter, TableOfContentsItem } from '../../interfaces/read-metadata.interfaces';
import { Chapter, Section } from "../../interfaces/view-data.interfaces";

export function MakeDefaultChapter(chapter: BasicObject, key?: number): Chapter {
    let partialChapter = { ...MakeDefaultUnpublishedItem(chapter) } as Chapter;
    partialChapter.sections = Array<Section>();
    if (key != undefined) {
        partialChapter.key = key;
    }
    return partialChapter;
}

export function MapChapter( slugBase: string): Chapter {

}