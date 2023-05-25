import { ParsedUrlQuery } from 'querystring';
import { Url } from 'url';

export enum PublishStatus {
    Unpublished = 1,
    New,
    PatreonOnly,
    Public
}

export interface NavigationLink {
    pathname: string;
    params: ParsedUrlQuery
}

export interface NavigationItem {
    slug: ParsedUrlQuery | string;
    title: string;
    shortTitle: string;
    key: number;
    status: PublishStatus;
}

export interface NavigationPart extends NavigationItem {
    chapters: NavigationChapter[];
}

export interface NavigationChapter extends NavigationItem {
    sections: NavigationItem[];
}