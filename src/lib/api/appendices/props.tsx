export const getAppendicesHomeProps:string =`
title,
content,
metadata.map,
metadata.appendix_items.header,
metadata.appendix_items.image,
metadata.appendix_items.document.slug,
metadata.character_lookup,metadata.station_lookup`;

export const getTitleAndMetaProps: string = `
slug,
title,
id,
metadata`;

export const getAppendixProps: string = `
title,
content`;


export const getSlugOnly: string = `slug`;