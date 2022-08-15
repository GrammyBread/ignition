import { CosmicQuery } from "../query";
import { minifyProps } from "../shared";
import { getHomeProps, getPatreonProps } from './props';

export function makeGetHomeQuery (): CosmicQuery
{
    return {
        query: {
            type: "home",
            slug: "home-page"
          },
        props: minifyProps(getHomeProps)
    };
}

export function makeGetPatreonQuery(): CosmicQuery
{
    return {
        query: {
            type: "patreon",
            slug: "patreon"
          },
        props: minifyProps(getPatreonProps)
    };
}