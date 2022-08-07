import { CosmicQuery } from "../query";
import { 
    minifyProps, 
    getNavProps, 
    getPartProps, 
    getPartsProps,
    getChapterProps, 
    getAvailableChaptersProps,
    getSection,
    getAvailableSectionsProps } from "./props";

//Get Part Data
export function makeGetNavigationQuery(): CosmicQuery {

    return {
        query: {
            type: "navigation",
            slug: "navigation"
          },
          props: minifyProps(getNavProps)
    }
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

export function makeGetPartsQuery(): CosmicQuery {
    return {
        limit: 5,
        query: {
            type: 'parts',
        },
        props: minifyProps(getPartsProps)
    };
}

//Get Chapter Data
export function makeGetAvailableChaptersQuery(): CosmicQuery {
    return {
        query: {
            type: "parts"
        },
        props: minifyProps(getAvailableChaptersProps)
    }
}

export function makeGetChapterQuery(chapterSlug: string): CosmicQuery {
    return {
        query: {
            type: "chapters",
            slug: chapterSlug
        },
        props: minifyProps(getChapterProps)
    };
}

//Get Section Data
export function makeGetAvailableSectionsQuery(): CosmicQuery {
    return {
        query: {
            type: "parts"
        },
        props: minifyProps(getAvailableSectionsProps)
    }
}

export function makeGetSectionQuery(sectionSlug: string): CosmicQuery {
    return {
        query: {
            type: "sections",
            slug: sectionSlug
        },
        props: minifyProps(getSection)
    };
}