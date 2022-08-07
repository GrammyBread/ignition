import {SectionAvailability } from '../interfaces/view-data.interfaces';


export enum PublishStatus {
    Published,
    Unpublished,
    New,
    PatreonOnly,
    Public
}

export function IdentifyNewestSection(sections: SectionAvailability[]) : string {
    let mostRecentSection = {
        name: "",
        releaseDate: new Date()
    }
    
    sections.forEach((section) => {

    })


}

export function DetermineSectionStatus(status: string, patreonRelease: string, publicRelease: string): PublishStatus {
    
    if(status.toLowerCase() != "published") return PublishStatus.Unpublished;
    
    let currentDate = new Date();
    let patreonPublishDate = patreonRelease != undefined ? new Date(patreonRelease) : undefined;
    let publicReleaseDate = publicRelease != undefined ? new Date(publicRelease) : undefined;

    if(publicReleaseDate && publicReleaseDate <= currentDate) return PublishStatus.Public;
    if(patreonPublishDate && patreonPublishDate <= currentDate) return PublishStatus.PatreonOnly;

    return PublishStatus.Unpublished;
}