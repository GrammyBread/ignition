import { CosmicQuery } from "../query";
import { minifyProps } from "../shared";
import {
    getGenericProps,
    getPingProps
} from './props';

export function makeGetHomeQuery(): CosmicQuery {
    return {
        query: {
            type: "home",
            slug: "casa"
        },
        props: minifyProps(getGenericProps)
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
        props: minifyProps(getGenericProps)
    };
}
