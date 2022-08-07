import {SectionAvailability } from '../interfaces/view-data.interfaces';

export enum ItemStatus {
    Published = 1,
    Unpublished,
    New,
    PatreonOnly,
    Public
}

interface MostRecentSection {
    index: number;
    releaseDate: Date|undefined;
}

export function IdentifyNewestSection(sections: SectionAvailability[]) : number {
    let mostRecentSection = {
        index: -1,
        releaseDate: undefined
    } as MostRecentSection;
    
    sections.filter((section) => section.status == ItemStatus.Published).forEach((section, index) => {
        if(section.releaseDate && 
            (!mostRecentSection.releaseDate || section.releaseDate > mostRecentSection.releaseDate)) {            
            mostRecentSection = {
                index,
                releaseDate: section.releaseDate
            }
        }
    });
    return mostRecentSection.index;
}

export function DetermineSectionStatus(status: string, patreonRelease: string, publicRelease: string): ItemStatus {
    if (status.toLowerCase() != "published") return ItemStatus.Unpublished;
    
    let currentDate = new Date();
    let patreonPublishDate = patreonRelease != undefined ? new Date(patreonRelease) : undefined;
    let publicReleaseDate = publicRelease != undefined ? new Date(publicRelease) : undefined;

    if (publicReleaseDate && publicReleaseDate <= currentDate) return ItemStatus.Public;
    if (patreonPublishDate && patreonPublishDate <= currentDate) return ItemStatus.PatreonOnly;

    return ItemStatus.Unpublished;
}