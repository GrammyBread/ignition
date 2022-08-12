import { TOCChapterCosmicProps, TOCChapterProps, TOCPartProps } from "../../components/TableOfContents/Table/Table";
import { CosmicChapter, CosmicSection } from "../../interfaces/read-metadata.interfaces";
import { ChapterAvailability, SectionAvailability, TableOfContentsChapter, TableOfContentsItem } from '../../interfaces/view-data.interfaces';
import { DetermineSectionStatus, ItemStatus, IdentifyNewestSection } from "./state.mappers";

export interface ChapterInCosmic
{
    key: number;
    name: string;
    sections: SectionInCosmic[] | undefined;
    slug: string;
}

export interface SectionInCosmic
{
    key: number;
    name: string;
    patreonRelease: string;
    publicRelease: string;
    status: string;
    slug: string;
}

export function mapSectionAvailability ( section: TableOfContentsItem, cosmicSections: SectionInCosmic[] ): SectionAvailability
{
    let cosmicSection = cosmicSections.find( ( cosmicSection ) =>
    {
        return cosmicSection.key == section.Key;
    } );

    if ( cosmicSection == undefined )
    {
        return {
            header: section.Title,
            key: section.Key,
            publishStatus: ItemStatus.Unpublished,
            releaseDate: undefined
        } as SectionAvailability;
    }

    let itemStatus = DetermineSectionStatus( cosmicSection.status, cosmicSection.patreonRelease, cosmicSection.publicRelease );

    return {
        header: section.Title,
        key: section.Key,
        publishStatus: itemStatus,
        slug: cosmicSection.slug,
        releaseDate: cosmicSection.publicRelease ? new Date( cosmicSection.publicRelease ) : undefined
    } as SectionAvailability;
}

export function mapChaptersSectionsAvailability ( sections: TableOfContentsItem[], cosmicSections: SectionInCosmic[] ): [ SectionAvailability[], ItemStatus ]
{
    let chapterStatus = ItemStatus.Unpublished;

    let sectionAvailabilities = sections.map( ( section ) =>
    {
        let sectionAvailability = mapSectionAvailability( section, cosmicSections );
        chapterStatus = sectionAvailability.publishStatus == ItemStatus.Public ||
            sectionAvailability.publishStatus == ItemStatus.PatreonOnly && chapterStatus != ItemStatus.Public ?
            sectionAvailability.publishStatus : chapterStatus;
        return sectionAvailability;
    } );

    let newestSection = IdentifyNewestSection( sectionAvailabilities );
    if ( newestSection > -1 ) sectionAvailabilities[ newestSection ].publishStatus = ItemStatus.New;
    return [ sectionAvailabilities, chapterStatus ];
}

export function mapChapterAvailability ( chapter: TableOfContentsChapter, cosmicChapters: ChapterInCosmic[] | undefined ): ChapterAvailability
{
    let relatedCosmicChapter = cosmicChapters != undefined ? cosmicChapters.find( ( cosmicChapter ) =>
    {
        return cosmicChapter.key == chapter.Key;
    } ) : undefined;

    if ( relatedCosmicChapter == undefined || relatedCosmicChapter.sections == undefined )
    {
        return {
            header: chapter.Title,
            publishStatus: ItemStatus.Unpublished,
            sections: chapter.Sections.map( ( section ) => ( {
                header: section.Title,
                key: section.Key,
                publishStatus: ItemStatus.Unpublished,
                releaseDate: undefined,
            } as SectionAvailability ) )
        } as ChapterAvailability;
    }
    else
    {
        let [ sectionAvailability, chapterStatus ] = mapChaptersSectionsAvailability( chapter.Sections, relatedCosmicChapter.sections );
        return {
            header: chapter.Title,
            key: chapter.Key,
            publishStatus: chapterStatus,
            sections: sectionAvailability,
            slug: relatedCosmicChapter.slug
        } as ChapterAvailability;
    }
}


function mapChapterInCosmic ( chapter: CosmicChapter )
{
    return {
        name: chapter.metadata?.header,
        key: chapter.metadata?.key,
        slug: chapter.slug,
        sections: chapter.metadata?.sections != undefined ? chapter.metadata.sections.map( ( section ) => ( {
            name: section.metadata?.header,
            status: section.status,
            key: section.metadata?.key,
            patreonRelease: section.metadata?.patreon_release_date,
            publicRelease: section.metadata?.public_release_date,
            slug: section.slug
        } as SectionInCosmic ) ) : undefined
    } as ChapterInCosmic;
}

export function mapTOCChapterAvailability ( tocData: TOCChapterCosmicProps ): ChapterAvailability | undefined
{
    if ( tocData.chapterData )
    {
        let availableChapterInCosmic = new Array<ChapterInCosmic>;
        availableChapterInCosmic.push( mapChapterInCosmic( tocData.chapterDetails ) );

        return availableChapterInCosmic === undefined ?
            ( {
                header: tocData.chapterData.Title,
                publishStatus: ItemStatus.Unpublished,
                sections: tocData.chapterData.Sections.map(( section ) => ( {
                    header: section.Title,
                    key: section.Key,
                    releaseDate: undefined,
                    publishStatus: ItemStatus.Unpublished
                } as SectionAvailability ) )
            } as ChapterAvailability )
            :
            mapChapterAvailability( tocData.chapterData, availableChapterInCosmic );
    }
    return undefined;
}

export function mapTOCPartAvailability ( tocData: TOCPartProps ): ChapterAvailability[] | undefined
{
    if ( tocData.partData )
    {
        let availableChaptersInCosmic = tocData.partDetails.metadata?.chapters.map( ( chapter ) => ( mapChapterInCosmic( chapter ) ) );


        return ( availableChaptersInCosmic != undefined && availableChaptersInCosmic.length > 0 ) ?
            tocData.partData.Chapters.map( ( chapter ) => mapChapterAvailability( chapter, availableChaptersInCosmic ) )
            :
            tocData.partData.Chapters.map( ( chapter ) => ( {
                header: chapter.Title,
                publishStatus: ItemStatus.Unpublished,
                sections: chapter.Sections.map( ( section ) => ( {
                    header: section.Title,
                    key: section.Key,
                    releaseDate: undefined,
                    publishStatus: ItemStatus.Unpublished
                } as SectionAvailability ) )
            } as ChapterAvailability ) );
    }
    return undefined;
}

