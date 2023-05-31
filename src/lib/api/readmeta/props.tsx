export const getSiteProps: string = `
title,
content,
metadata.logo,
metadata.social_urls.domain,
metadata.social_urls.one,
metadata.social_urls.two,
metadata.published_parts.title,
metadata.published_parts.slug,
metadata.published_parts.status,
metadata.published_parts.metadata.metadata.key,
metadata.published_parts.metadata.metadata.logline,
metadata.published_parts.metadata.metadata.part_data,
metadata.published_parts.metadata.metadata.is_header,
metadata.published_parts.metadata.chapters.slug,
metadata.published_parts.metadata.chapters.status,
metadata.published_parts.metadata.chapters.metadata.metadata.title,
metadata.published_parts.metadata.chapters.metadata.metadata.key,
metadata.published_parts.metadata.chapters.metadata.metadata.section_data,
metadata.published_parts.metadata.chapters.metadata.intro.metadata.metadata.title,
metadata.published_parts.metadata.chapters.metadata.intro.slug,
metadata.published_parts.metadata.chapters.metadata.intro.metadata.publish_details.key,
metadata.published_parts.metadata.chapters.metadata.intro.metadata.publish_details.patreon_release,
metadata.published_parts.metadata.chapters.metadata.intro.metadata.publish_details.public_release,
metadata.published_parts.metadata.chapters.metadata.sections.status,
metadata.published_parts.metadata.chapters.metadata.sections.slug,
metadata.published_parts.metadata.chapters.metadata.sections.metadata.metadata.title,
metadata.published_parts.metadata.chapters.metadata.sections.metadata.publish_details.key,
metadata.published_parts.metadata.chapters.metadata.sections.metadata.publish_details.patreon_release,
metadata.published_parts.metadata.chapters.metadata.sections.metadata.publish_details.public_release`;

export const getPartsProps: string = `
title,
slug,
metadata.metadata.key,
metadata.metadata.logline,
metadata.images.thumbnail`;

export const getPartProps: string = `
title,
metadata.metadata.key,
metadata.metadata.logline,
metadata.images.table_of_contents,
metadata.images.thumbnail`;

export const getChapterProps: string = `
title,
id,
metadata.header,
metadata.key,
metadata.previous_chapter_recap,
metadata.header_scripts,
metadata.chapter_image`;

export const getChapterHeaderScript: string = `
title,
id,
metadata.header,
metadata.key,
metadata.header_scripts`;

export const getSectionProps: string = `
title,
content,
metadata.metadata,
metadata.images,
metadata.seo,
metadata.publish_details,
metadata.related_sections.previous.slug,
metadata.related_sections.next.slug,
metadata.blocks`;

export const getFeaturedSectionProps: string = `
title,
metadata.metadata,
metadata.images,
metadata.seo,
metadata.publish_details`;