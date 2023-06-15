import { CleanedNavigation } from '../../../interfaces/read/cleaned-types.interface';
import { NavigationChapter, NavigationSection } from '../../../interfaces/read/nav-data.interfaces';
import { PartCardProps } from '../../../components/PartCard/PartCard';
import { CosmicPart, CosmicSection, Resource } from '../../../interfaces/read/cosmic/cosmic-metadata.interfaces';
import { PublishStatus } from '../../../interfaces/read/nav-data.interfaces';
import { ParsedUrlQuery } from 'querystring';
import { FeaturedSectionProps } from '../../../components/HomePage/FeaturedSection/FeaturedSection';

export interface CacheableSiteData {
    navigation: CleanedNavigation;
    logo: Resource;
    domain: string;
}

export class CleanSiteData {
    private readonly _siteNavigation: CleanedNavigation;
    private _newestSection?: string;

    constructor(navigation: CleanedNavigation) {
        this._siteNavigation = navigation;
    }

    getCacheableVersion(): CleanedNavigation {
        return this._siteNavigation;
    }

    getNewestSectionSlug() : string | undefined {
        if(!this._newestSection) {
            const newestPart = this._siteNavigation.data.find((part) => part.status === PublishStatus.New);
            const newestChapter = newestPart?.chapters.find((chapter) => chapter.status === PublishStatus.New);
            const newestSection = newestChapter?.sections.find((section) => section.status === PublishStatus.New);
            this._newestSection = newestSection?.slug ? (newestSection?.slug as ParsedUrlQuery)?.sectionslug as string : undefined;
        }
        return this._newestSection;
    }

    //Related Pieces Look Up
    getRelatedSection(sectionKey: number) {
        let relatedSection: NavigationSection | undefined;

        const chapterNum = Math.floor(sectionKey / 10);

        const relatedChapter = this.getRelatedChapter(chapterNum);

        if (relatedChapter) {
            relatedSection = relatedChapter.sections.find((section) => section.key === sectionKey);
        }

        return relatedSection;
    }

    getRelatedChapter(chapterKey: number) {
        let relatedChapter: NavigationChapter | undefined;

        const partNum = Math.floor(chapterKey / 10);

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
                        isPatreonOnly: part.status === PublishStatus.PatreonOnly,
                        navigationDetails: this.getRelatedPart(part.key)
                    } as PartCardProps;
                }
            });
        return mappedParts.filter((partProp) => !!partProp) as PartCardProps[];
    }

    makeFeaturedSection(section: CosmicSection): FeaturedSectionProps | null {
        const mappedSection = this.getRelatedSection(section.metadata.publish_details.key);

        if (mappedSection && section) {
            return {
                ...mappedSection,
                releaseDate: section.metadata.publish_details.public_release,
                images: section.metadata.images
            } as FeaturedSectionProps;
        }

        return null;
    }

}