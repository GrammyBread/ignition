import { CosmicQuery } from "../query";
import { minifyProps } from "../shared";
import { getAppendicesHomeProps, getAppendixProps, getTitleAndMetaProps, getSlugOnly } from './props';

//Get Home Data
export function makeGetAppendicesHome(): CosmicQuery {

    return {
        query: {
            type: "lore-page",
            slug: "only-one-way-to-burn-it-down-lore"
          },
          props: minifyProps(getAppendicesHomeProps)
    }
}

export function makeGetCharacterPageQuery(): CosmicQuery {
    return {
        query: {
            type: "appendices-pages",
            slug: "search-characters"
        },
        props: minifyProps(getAppendixProps)
    };
}

export function makeGetCharactersQuery(): CosmicQuery {
    return {
        query: {
            type: "character-cards"
        },
        props: minifyProps(getTitleAndMetaProps)
    };
}

export function makeGetStationPageQuery(): CosmicQuery {
    return {
        query: {
            type: "appendices-pages",
            slug: "great-stations"
        },
        props: minifyProps(getAppendixProps)
    };
}

export function makeGetStationsQuery(): CosmicQuery {
    return {
        query: {
            type: "station-cards"
        },
        props: minifyProps(getTitleAndMetaProps)
    };
}

export function makeGetArchQuery(): CosmicQuery {
    return {
        query: {
            type: "arch-stations"
        },
        props: minifyProps(getTitleAndMetaProps)
    };
}

export function makeGetLoreDocument(slug: string): CosmicQuery {
    return {
        query: {
            type: "lore-documents",
            slug: slug
        },
        props: minifyProps(getTitleAndMetaProps)
    };
}

export function makeGetLoreDocuments(): CosmicQuery {
    return {
        query: {
            type: "lore-documents",
        },
        props: minifyProps(getSlugOnly)
    };
}