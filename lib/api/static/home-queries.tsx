import { CosmicQuery } from "../query";

//Get Part Data
export function makeGetHomeQuery (): CosmicQuery
{
    return {
        query: {
            type: "home",
            slug: "home-page"
          },
        props: "title,content,metadata"
    };
}