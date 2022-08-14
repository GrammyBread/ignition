import { CosmicQuery } from "../query";
import { minifyProps } from "../shared";
import { getAvailablePartsProps, getChapterHeaderScript } from './props';
import { 
    getSiteProps, 
    getPartProps, 
    getPartsProps,
    getChapterProps, 
    getAvailableChaptersProps,
    getSectionProps,
    getAvailableSectionsProps } from "./props";


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

//Get Available Slugs
export function makeGetAvailablePartsQuery(): CosmicQuery {
    return {
        query: {
            type: "parts"
        },
        props: minifyProps(getAvailablePartsProps)
    }
}

export function makeGetAvailableChaptersQuery(): CosmicQuery {
    return {
        query: {
            type: "parts"
        },
        props: minifyProps(getAvailableChaptersProps)
    }
}

export function makeGetAvailableSectionsQuery(): CosmicQuery {
    return {
        query: {
            type: "parts"
        },
        props: minifyProps(getAvailableSectionsProps)
    }
}