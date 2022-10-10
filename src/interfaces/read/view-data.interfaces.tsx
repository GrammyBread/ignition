import { ParsedUrlQuery } from "querystring";
import { ItemStatus } from "../../mappers/availability/state.mappers";
import { BasicMetadata } from "./read-metadata.interfaces";


export interface ReadItem extends BasicMetadata {
    publishStatus: ItemStatus;
    fullPath?: ParsedUrlQuery;
    id?: string;
}

export interface Section extends ReadItem {
    releaseDate?: string;
}

export interface Chapter extends ReadItem {
    sections: Section[];
}

export interface Part extends ReadItem {
    chapters: Chapter[];
}

export interface Story {
    parts: Part[];
}
