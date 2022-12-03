import { CosmicQuery } from "../query";
import { minifyProps } from "../shared";
import {
    getHomeProps,
    getPatreonProps,
    getPingProps
} from './props';

export function makeGetHomeQuery(): CosmicQuery {
    return {
        query: {
            type: "home",
            slug: "home-page"
        },
        props: minifyProps(getHomeProps)
    };
}

export function makeGetPingQuery(): CosmicQuery {
    return {
        query: {
            type: "license-page",
            slug: "licenses-page"
        },
        props: minifyProps(getPingProps)
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
