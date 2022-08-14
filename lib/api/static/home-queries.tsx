import { CosmicQuery } from "../query";
import { minifyProps } from "../shared";
import { getHomeProps } from './props';

//Get Part Data
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