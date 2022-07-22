import { TOCProps } from "../components/TableOfContents/TableOfContents";
import { Section } from "../interfaces/read-metadata.interfaces";
import { ChapterAvailability, ItemStatus, SectionAvailability, TableOfContentsChapter } from '../interfaces/view-data.interfaces';
import DeterminePublishStatus, { PublishStatus } from "./state.mappers";

export interface ChapterInCosmic {
    name: string;
    sections: Section[] | undefined;
}

export function mapAvailableSections(sections: string[], cosmicSections: Section[]): [SectionAvailability[], ItemStatus] {
    let chapterStatus = ItemStatus.Unpublished;
    
    let sectionAvailability = sections.map((section) => {
        let cosmicSection = cosmicSections.find((cosmicSection) => {
            cosmicSection.title == section
        })

        if(cosmicSection == undefined)
        {
            return { 
                title: section,
                status: ItemStatus.Unpublished
            } as SectionAvailability;
        }
        
        let publishStatus = DeterminePublishStatus(cosmicSection.status);
        let currentDate = new Date();
        let patreonPublishDate = cosmicSection.metadata?.patreon_realease_date != undefined ? new Date(cosmicSection.metadata.patreon_realease_date) : undefined;
        if(publishStatus == PublishStatus.Published) {
            chapterStatus = ItemStatus.Published;
            return {
                title: section,
                status: ItemStatus.Published
            } as SectionAvailability;
        }

        if(patreonPublishDate != undefined && patreonPublishDate < currentDate)
        {
            chapterStatus = chapterStatus != ItemStatus.Published ? ItemStatus.OnPatreon : chapterStatus;
            return {
                title: section,
                status: ItemStatus.OnPatreon
            }  as SectionAvailability;
        } 
        else {

            return { 
                title: section,
                status: ItemStatus.Unpublished
            } as SectionAvailability;
        }
    });

    return [sectionAvailability, chapterStatus];
}



export function mapChapterAvailability(chapter: TableOfContentsChapter, cosmicChapters: ChapterInCosmic[]): ChapterAvailability {
    let relatedCosmicChapter = cosmicChapters.find((cosmicChapter) => {
        return cosmicChapter.name == chapter.title
    })

    if(relatedCosmicChapter == undefined || relatedCosmicChapter.sections == undefined) {
        return {
            title: chapter.title,
            status: ItemStatus.Unpublished,
            sections: chapter.sections.map((section) => ({
                title: section,
                status: ItemStatus.Unpublished
            }))
        } as ChapterAvailability
    }
    else
    {
        let 

    }
}

export function mapAvailableChapters(tocData: TOCProps): ChapterAvailability[] {
    let availChapters = tocData.partDetails.metadata?.chapters.map((chapter) => ({
        name: chapter.title,
        sections: chapter.metadata?.sections.map((section) => ({
            name: section.title,
            status: section.status
        }))
    } as ChapterInCosmic))

    tocData.data.chapters.map((chapter) => {
        availChapters.
        if()
    })

}

