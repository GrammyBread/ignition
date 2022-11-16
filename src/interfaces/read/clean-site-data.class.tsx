import { ItemStatus } from '../../mappers/availability/state.mappers';
import { CleanedNavigation } from './cleaned-types.interface';
import { 
    NavPart, 
    NavItem, 
    NavChapter } from './nav-data.interfaces';
import { CosmicPart, Resource } from "./read-metadata.interfaces";
import { 
    Chapter, 
    Section, 
    Story } from "./view-data.interfaces";
import { PartCardProps } from '../../components/PartCard/PartCard';
import { NORMAL_CHAPTER_PATH, NORMAL_PART_PATH, NORMAL_SECTION_PATH } from '../../mappers/pathname.mapper';

export interface CacheableSiteData {
    story: Story;
    logo: Resource;
    domain: string;
}

export class CleanSiteData {
    readonly _siteData: Story;
    readonly _siteLogo: Resource;
    readonly _siteDomain: string;

    constructor({ story, logo, domain }: CacheableSiteData) {
        this._siteData = story;
        this._siteLogo = logo;
        this._siteDomain = domain;
    }

    getCacheableVersion(): CacheableSiteData {
        return {
            story: this._siteData,
            logo: this._siteLogo,
            domain: this._siteDomain
        }
    }

    private isStatusValid(status: ItemStatus, dontIncludePatreon?: boolean) {
        return status != ItemStatus.Unpublished && (!dontIncludePatreon || status != ItemStatus.PatreonOnly);
    }

    getSimpleNav(dontIncludePatreon?: boolean): CleanedNavigation {
        let publishedParts = this._siteData.parts.filter((part) => this.isStatusValid(part.publishStatus, dontIncludePatreon))
            .map((part) => {
                let publishedChapters = part.chapters.filter((chp) => this.isStatusValid(chp.publishStatus, dontIncludePatreon))
                    .map((chp) => {
                        let publishedSections = chp.sections.filter((sec) => this.isStatusValid(sec.publishStatus, dontIncludePatreon))
                            .map((sec) => ({
                                slug: {
                                    params: sec.fullPath,
                                    pathname: NORMAL_SECTION_PATH
                                },
                                title: sec.header,
                                key: sec.key,
                                isPatreonOnly: sec.publishStatus == ItemStatus.PatreonOnly
                            } as NavItem));

                        return {
                            sections: publishedSections,
                            slug: {
                                params: chp.fullPath, 
                                pathname: NORMAL_CHAPTER_PATH
                            },
                            title: chp.header,
                            key: chp.key,
                            isPatreonOnly: chp.publishStatus == ItemStatus.PatreonOnly
                        } as NavChapter;
                    });

                return {
                    chapters: publishedChapters,
                    slug: {
                        params: part.fullPath,
                        pathname: NORMAL_PART_PATH
                    },
                    title: part.header,
                    key: part.key,
                    isPatreonOnly: part.publishStatus == ItemStatus.PatreonOnly
                } as NavPart
            })

        return {
            data: publishedParts,
            logoUrl: this._siteLogo,
            domain: this._siteDomain
        } as CleanedNavigation
    }

    getRelatedSection(sectionId: string) {
        let relatedSection: Section | undefined;
        const parts = this._siteData.parts;
        for (let pi = 0; pi < parts.length && relatedSection == undefined; pi++) {
            let part = parts[pi];
            for (let ci = 0; ci < part.chapters.length && relatedSection == undefined; ci++) {
                let chapter = part.chapters[ci];
                for (let si = 0; ci < chapter.sections.length && relatedSection == undefined; si++) {
                    let section = chapter.sections[si];
                    if (section.id === sectionId) {
                        relatedSection = section;
                    }
                }
            }
        }
        return relatedSection;
    }

    getRelatedChapter(chapterId: string) {
        let relatedChapter: Chapter | undefined;
        const parts = this._siteData.parts;
        for (let pi = 0; pi < parts.length && relatedChapter == undefined; pi++) {
            let part = parts[pi];
            for (let ci = 0; ci < part.chapters.length && relatedChapter == undefined; ci++) {
                let chapter = part.chapters[ci];
                if (chapter.id == chapterId) {
                    relatedChapter = chapter;
                }
            }
        }
        return relatedChapter;
    }

    getRelatedPart(partId: string) {
        return this._siteData.parts.find((part) => part.id === partId);
    }

    getPartsForDisplay(cosmicParts: CosmicPart[]) {
        let mappedParts = this._siteData.parts.filter((part) => part.publishStatus != ItemStatus.Unpublished)
            .map((part) => {
                let relatedCosmicPart = cosmicParts.find((cosmic) => {
                    return cosmic.id == part.id
                });

                if (relatedCosmicPart != undefined && relatedCosmicPart.metadata != undefined) {
                    return {
                        slug: part.fullPath,
                        title: part.header,
                        key: part.key,
                        partImageUrl: relatedCosmicPart.metadata.part_image.url,
                        logline: relatedCosmicPart.metadata.part_logline,
                        isPatreonOnly: part.publishStatus == ItemStatus.PatreonOnly
                    } as PartCardProps;
                }
            })
        return mappedParts.filter((partProp) => !!partProp) as PartCardProps[];
    }

}