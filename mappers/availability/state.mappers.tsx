import { Part } from '../../interfaces/view-data.interfaces';

export enum ItemStatus {
    Unpublished = 1,
    New,
    PatreonOnly,
    Public
}

interface MostRecentSection {
    partIndex: number;
    chapterIndex: number;
    sectionIndex: number;
    releaseDate: Date|undefined;
}

export function IdentifyNewestSection(parts: Part[]) : [partIndex: number, chapterIndex: number, sectionIndex: number] {
    let mostRecentSection = {
        partIndex: -1,
        chapterIndex: -1,
        sectionIndex: -1,
        releaseDate: undefined
    } as MostRecentSection;

    parts.forEach((part, partIndex) => {
        if(part.publishStatus == ItemStatus.Public) {
            part.chapters.forEach((chapter, chapterIndex) => {
                if(chapter.publishStatus == ItemStatus.Public) {
                    chapter.sections.filter((section) => section.publishStatus == ItemStatus.Public).forEach((section, sectionIndex) => {
                        if(section.releaseDate != undefined)
                        {
                            let releaseDate = new Date(section.releaseDate);
                            if(!mostRecentSection.releaseDate || releaseDate > mostRecentSection.releaseDate) {
                                mostRecentSection = {
                                    partIndex: partIndex,
                                    chapterIndex: chapterIndex,
                                    sectionIndex: sectionIndex,
                                    releaseDate: releaseDate
                                };
                            }
                        }
                    });
                }
            });
        }        
    });
    
    return [mostRecentSection.partIndex, mostRecentSection.chapterIndex, mostRecentSection.sectionIndex];
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