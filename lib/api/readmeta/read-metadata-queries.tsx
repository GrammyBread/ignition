import { CosmicQuery } from "../query";

//Get Part Data
export function makeGetPartQuery(name: string): CosmicQuery {
    return {
        query: {
            type: "parts",
            slug: name
        },
        props: "title,metadata.table_of_contents_image,metadata.part_logline,metadata.chapters.slug,metadata.chapters.title,metadata.chapters.metadata.sections.slug,metadata.chapters.metadata.sections.title"
    };
}

export function makeGetPartsQuery(): CosmicQuery {
    return {
        limit: 5,
        query: {
            type: 'parts',
        },
        props: 'title,slug,metadata.part_image',
    };
}

//Get Chapter Data
export function makeGetAvailableChapters(): CosmicQuery {
    return {
        query: {
            type: "parts"
        },
        props: "slug,metadata.chapters.slug"
    }
}

export function makeGetChapterQuery(chapterSlug: string): CosmicQuery {
    return {
        query: {
            type: "chapters",
            slug: chapterSlug
        },
        props: "title,slug,metadata.chapter_image,metadata.previous_chapter_recap,metadata.sections.slug,metadata.sections.title"
    };
}

//Get Section Data
export function makeGetAvailableSections(): CosmicQuery {
    return {
        query: {
            type: "parts"
        },
        props: "slug,metadata.chapters.slug,metadata.chapters.metadata.sections.slug"
    }
}

export function makeGetSectionQuery(sectionSlug: string): CosmicQuery {
    return {
        query: {
            type: "sections",
            slug: sectionSlug
        },
        props: "title,metadata"
    };
}