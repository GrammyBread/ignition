import { ParsedUrlQuery } from 'querystring';

export interface NavLinkDetails {
    pathname: string;
    params: ParsedUrlQuery
}

export interface NavItem {
    slug: NavLinkDetails;
    title: string;
    key: number;
    isPatreonOnly: boolean
}

export interface NavPart extends NavItem {
    chapters: NavChapter[];
}

export interface NavChapter extends NavItem {
    sections: NavItem[];
}