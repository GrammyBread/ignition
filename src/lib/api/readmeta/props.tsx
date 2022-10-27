export const getSiteProps:string =`
title,
content,
metadata.logo,
metadata.published_parts.title,
metadata.published_parts.slug,
metadata.published_parts.id,
metadata.published_parts.status,
metadata.published_parts.metadata.key,
metadata.published_parts.metadata.part_logline,
metadata.published_parts.metadata.part_image,
metadata.published_parts.metadata.table_of_contents_data,
metadata.published_parts.metadata.chapters.title,
metadata.published_parts.metadata.chapters.slug,
metadata.published_parts.metadata.chapters.id,
metadata.published_parts.metadata.chapters.status,
metadata.published_parts.metadata.chapters.metadata.header,
metadata.published_parts.metadata.chapters.metadata.key,
metadata.published_parts.metadata.chapters.metadata.chapter_section_data,
metadata.published_parts.metadata.chapters.metadata.sections.title,
metadata.published_parts.metadata.chapters.metadata.sections.slug,
metadata.published_parts.metadata.chapters.metadata.sections.id,
metadata.published_parts.metadata.chapters.metadata.sections.status,
metadata.published_parts.metadata.chapters.metadata.sections.metadata.header,
metadata.published_parts.metadata.chapters.metadata.sections.metadata.key,
metadata.published_parts.metadata.chapters.metadata.sections.metadata.patreon_release_date,
metadata.published_parts.metadata.chapters.metadata.sections.metadata.public_release_date`;

export const getPartsProps: string = `
title,
id,
metadata.part_image,
metadata.part_logline,
metadata.key`;

export const getPartProps: string = `
title,
id,
metadata.table_of_contents_image,
metadata.part_logline,
metadata.key`;

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
id,
status,
metadata`;