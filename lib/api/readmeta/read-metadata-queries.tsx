import { CosmicQuery } from "../query";

//Get Part Data
export function makeGetNavigationQuery(): CosmicQuery {
    return {
        query: {
            type: "navigation",
            slug: "navigation"
          },
          props: "title,content,metadata.logo,metadata.published_parts.slug,metadata.published_parts.title,metadata.published_parts.status,metadata.published_parts.metadata.part_logline,metadata.published_parts.metadata.part_image,metadata.published_parts.metadata.chapters.title,metadata.published_parts.metadata.chapters.slug,metadata.published_parts.metadata.chapters.status,metadata.published_parts.metadata.chapters.metadata.sections.slug,metadata.published_parts.metadata.chapters.metadata.sections.title,metadata.published_parts.metadata.chapters.metadata.sections.status"
    }
}

export function makeGetPartQuery(name: string): CosmicQuery {
    return {
        query: {
            type: "parts",
            slug: name
        },
        props: "title,metadata.table_of_contents_image,metadata.part_logline,metadata.table_of_contents_data,metadata.chapters.slug,metadata.chapters.title,metadata.chapters.status,metadata.chapters.metadata.sections.slug,metadata.chapters.metadata.sections.title,metadata.chapters.metadata.sections.status,metadata.chapters.metadata.sections.metadata.patreon_realease_date"
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
export function makeGetAvailableChaptersQuery(): CosmicQuery {
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
        props: "title,slug,metadata.chapter_section_data,metadata.chapter_image,metadata.previous_chapter_recap,metadata.sections.slug,metadata.sections.title,metadata.sections.status"
    };
}

//Get Section Data
export function makeGetAvailableSectionsQuery(): CosmicQuery {
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
        props: "title,status,metadata"
    };
}