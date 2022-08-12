export const minifyProps = (props:string) => {
    let smallProp = props.replace(/(?:\r\n|\r|\n)/g, '');
    return smallProp;
}

export const getNavProps:string =`
title,
content,
metadata.logo,
metadata.published_parts.title,
metadata.published_parts.slug,
metadata.published_parts.id,
metadata.published_parts.status,
metadata.published_parts.metadata.part_logline,
metadata.published_parts.metadata.part_image,
metadata.published_parts.metadata.part_number,
metadata.published_parts.metadata.chapters.title,
metadata.published_parts.metadata.chapters.slug,
metadata.published_parts.metadata.chapters.id,
metadata.published_parts.metadata.chapters.status,
metadata.published_parts.metadata.chapters.metadata.header,
metadata.published_parts.metadata.chapters.metadata.sections.title,
metadata.published_parts.metadata.chapters.metadata.sections.slug,
metadata.published_parts.metadata.chapters.metadata.sections.id,
metadata.published_parts.metadata.chapters.metadata.sections.status,
metadata.published_parts.metadata.chapters.metadata.sections.metadata.header,
metadata.published_parts.metadata.chapters.metadata.sections.metadata.patreon_release_date,
metadata.published_parts.metadata.chapters.metadata.sections.metadata.public_release_date`;

export const getPartProps: string = `
title,
id,
metadata.table_of_contents_image,
metadata.part_logline,
metadata.key,
metadata.table_of_contents_data,
metadata.chapters.title,
metadata.chapters.slug,
metadata.chapters.id,
metadata.chapters.status,
metadata.chapters.metadata.header,
metadata.chapters.metadata.key,
metadata.chapters.metadata.sections.title,
metadata.chapters.metadata.sections.slug,
metadata.chapters.metadata.sections.status,
metadata.chapters.metadata.sections.id,
metadata.chapters.metadata.sections.metadata.header,
metadata.chapters.metadata.sections.metadata.key,
metadata.chapters.metadata.sections.metadata.patreon_release_date,
metadata.chapters.metadata.sections.metadata.public_release_date`;

export const getPartsProps: string = `
title,
id,
slug,
metadata.part_image,
metadata.part_number`;

export const getChapterProps: string = `
title,
slug,
id,
metadata.header,
metadata.key,
metadata.chapter_section_data,
metadata.chapter_image,
metadata.previous_chapter_recap,
metadata.sections.slug,
metadata.sections.id,
metadata.sections.status,
metadata.sections.metadata.header`;

export const getAvailableSectionsProps: string = `
title,
slug,
id,
metadata.chapters.slug,
metadata.chapters.id,
metadata.chapters.metadata.sections.slug,
metadata.chapters.metadata.sections.id`;

export const getAvailableChaptersProps: string = `
title,
slug,
id,
status,
metadata.chapters.slug`;

export const getSection: string = `
title,
id,
status,
metadata`;