export interface CosmicQuery {
    limit?: number,
    query: {
        type: string,
        slug?: string
    },
    props: string,

}