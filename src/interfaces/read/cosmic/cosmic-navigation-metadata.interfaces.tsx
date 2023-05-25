export interface CosmicPartNavData extends CosmicItemNavData {
    chapters: CosmicChapterNavData[];
}

export interface CosmicChapterNavData extends CosmicItemNavData {
    sections: CosmicItemNavData[];
}

export interface CosmicItemNavData {
    title: string;
    short: string;
    key: number;
}