import { CosmicQuery } from "../query";
import { minifyProps } from "../shared";
import { getChapterHeaderScript } from './props';
import {
    getSiteProps,
    getPartProps,
    getPartsProps,
    getChapterProps,
    getSectionProps
} from "./props";


//Get Site Data
export function makeGetSiteDataQuery(): CosmicQuery {

    return {
        query: {
            type: "navigation",
            slug: "navigation"
        },
        props: minifyProps(getSiteProps)
    }
}

//Get Part Data
export function makeGetPartsQuery(): CosmicQuery {
    return {
        limit: 5,
        query: {
            type: 'parts',
        },
        props: minifyProps(getPartsProps)
    };
}

export function makeGetPartQuery(name: string): CosmicQuery {
    return {
        query: {
            type: "parts",
            slug: name
        },
        props: minifyProps(getPartProps)
    };
}

//Get Chapter Data
export function makeGetChapterQuery(chapterSlug: string): CosmicQuery {
    return {
        query: {
            type: "chapters",
            slug: chapterSlug
        },
        props: minifyProps(getChapterProps)
    };
}

export function makeGetChapterHeaderQuery(chapterSlug: string): CosmicQuery {
    return {
        query: {
            type: "chapters",
            slug: chapterSlug
        },
        props: minifyProps(getChapterHeaderScript)
    };
}

//Get Section Data
export function makeGetSectionQuery(sectionSlug: string): CosmicQuery {
    return {
        query: {
            type: "sections",
            slug: sectionSlug
        },
        props: minifyProps(getSectionProps)
    };
}

//Get Most Recent Section
export function makeGetMostRecentSections(): any {
    let currentDate = new Date();

    return {
        limit: 5,
        query: {
            type: "sections",
            'metadata.public_release_date': {
                $lte: currentDate.toISOString()
            }
        },
        props: minifyProps(getSectionProps)
    };
}