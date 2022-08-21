import { CosmicQuery } from "../query";
import { minifyProps } from "../shared";
import { getHomeProps, getPatreonProps, getCharacterProps } from './props';

export function makeGetHomeQuery(): CosmicQuery {
    return {
        query: {
            type: "home",
            slug: "home-page"
        },
        props: minifyProps(getHomeProps)
    };
}

export function makeGetPatreonQuery(): CosmicQuery {
    return {
        query: {
            type: "patreon",
            slug: "patreon"
        },
        props: minifyProps(getPatreonProps)
    };
}

export function makeGetCharactersQuery(): CosmicQuery {
    return {
        query: {
            type: "character-cards"
        },
        props: minifyProps(getCharacterProps)
    };
}