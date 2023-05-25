import { CleanedNavigation } from '../../../interfaces/read/cleaned-types.interface';
import { NavigationChapter, NavigationItem } from '../../../interfaces/read/nav-data.interfaces';
import { PartCardProps } from '../../../components/PartCard/PartCard';
import { CosmicPart, CosmicSection, Resource } from '../../../interfaces/read/cosmic/cosmic-metadata.interfaces';
import { PublishStatus } from '../../../interfaces/read/nav-data.interfaces';
import { ParsedUrlQuery } from 'querystring';

export interface NavigationScript {
    section: NavigationItem;
    isHead: boolean;
}

export interface FeaturedScript extends NavigationScript {
    image: Resource;
    logline: string;
}

export interface CacheableSiteData {
    navigation: CleanedNavigation;
    logo: Resource;
    domain: string;
}

export class CleanSiteData {
    private readonly _siteNavigation: CleanedNavigation;

    constructor(navigation: CleanedNavigation) {
        this._siteNavigation = navigation;
    }

    getCacheableVersion(): CleanedNavigation {
        return this._siteNavigation;
    }

    //Related Pieces Look Up
    getRelatedSection(sectionKey: number) {
        let relatedSection: NavigationItem | undefined;

        const chapterNum = sectionKey % 10;

        const relatedChapter = this.getRelatedChapter(chapterNum);

        if (relatedChapter) {
            relatedSection = relatedChapter.sections.find((section) => section.key === sectionKey);
        }

        return relatedSection
    }

    getRelatedChapter(chapterKey: number) {
        let relatedChapter: NavigationChapter | undefined;

        const partNum = chapterKey % 10;

        const relatedPart = this.getRelatedPart(partNum);

        if (relatedPart) {
            relatedChapter = relatedPart.chapters.find((chapter) => chapter.key === chapterKey);
        }

        return relatedChapter;
    }

    getRelatedPart(partKey: number) {
        return this._siteNavigation.data.find((part) => part.key === partKey);
    }

    //Avaialble Paths Look Up
    getAvailableParts(): {
        params: ParsedUrlQuery
    }[] {
        let availableParts = this._siteNavigation.data
            .filter((part) => part.status != PublishStatus.Unpublished)

        return availableParts.map((part) => ({
            params: part.slug as ParsedUrlQuery
        }));
    }

    getAvailableChapters(): {
        params: ParsedUrlQuery
    }[] {
        let availableChapters: ParsedUrlQuery[] = [];

        this._siteNavigation.data
            .forEach((part) => {
                if (part.status != PublishStatus.Unpublished) {
                    part.chapters.forEach((chapter) => {
                        if (chapter.status != PublishStatus.Unpublished) {
                            availableChapters.push(chapter.slug as ParsedUrlQuery);

                        }
                    })
                }
            });


        return availableChapters.map((slug) => ({
            params: slug
        }));
    }

    getAvailableSections(): {
        params: ParsedUrlQuery
    }[] {
        let availableSections: ParsedUrlQuery[] = [];

        this._siteNavigation.data
            .forEach((part) => {
                if (part.status != PublishStatus.Unpublished ){
                    part.chapters.forEach((chapter) => {
                        if (chapter.status != PublishStatus.Unpublished) {
                            chapter.sections.forEach((section) => {
                                if (section.status != PublishStatus.Unpublished) {
                                    availableSections.push(section.slug as ParsedUrlQuery);
                                }
                            })
                        }
                    })
                }
            });


        return availableSections.map((slug) => ({
            params: slug
        }));
    }

    //Miscellaneous
    getPartsForDisplay(cosmicParts: CosmicPart[]) {
        let mappedParts = this._siteNavigation.data
            .filter((part) => part.status != PublishStatus.Unpublished)
            .map((part) => {
                let relatedCosmicPart = cosmicParts.find((cosmic) => cosmic.metadata.metadata.key == part.key);

                if (relatedCosmicPart && relatedCosmicPart.metadata) {
                    return {
                        slug: part.slug,
                        title: part.title,
                        key: part.key,
                        imageUrl: relatedCosmicPart.metadata.images?.thumbnail.imgix_url,
                        logline: relatedCosmicPart.metadata.metadata.logline,
                        isPatreonOnly: part.status === PublishStatus.PatreonOnly
                    } as PartCardProps;
                }
            });
        return mappedParts.filter((partProp) => !!partProp) as PartCardProps[];
    }

    MakeNavigationScript(section: CosmicSection): NavigationScript | null {
        const mappedSection = this.getRelatedSection(section.metadata.publish_details.key);

        if (mappedSection) {
            return {
                section: mappedSection,
                isHead: section.metadata.metadata.is_header || false
            } as NavigationScript;
        }

        return null;
    }

    MakeFeaturedScript(section: CosmicSection): FeaturedScript | null {
        const mappedSection = this.getRelatedSection(section.metadata.publish_details.key);
        const scriptMetadata = section.metadata;

        if (mappedSection && scriptMetadata) {
            return {
                section: mappedSection,
                isHead: scriptMetadata.metadata.is_header || false,
                image: scriptMetadata.images?.hero,
                logline: scriptMetadata.metadata.catch || ''
            } as FeaturedScript;
        }

        return null;
    }

}