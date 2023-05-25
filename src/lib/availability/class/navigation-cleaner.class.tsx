import { ParsedUrlQuery } from "querystring";
import { CleanedNavigation } from "../../../interfaces/read/cleaned-types.interface";
import { CosmicChapter, CosmicPart, CosmicSection, CosmicSiteData } from "../../../interfaces/read/cosmic/cosmic-metadata.interfaces";
import { NavigationChapter, NavigationItem, NavigationPart, PublishStatus } from '../../../interfaces/read/nav-data.interfaces';
import { CosmicChapterNavData, CosmicItemNavData } from "../../../interfaces/read/cosmic/cosmic-navigation-metadata.interfaces";

interface LatestPublished {
    sectionKey: string | undefined;
    unpublishedDetected: boolean;
}

export class NavigationCleaner {
    private _cleanSiteNav: CleanedNavigation;
    private _lastPublished: LatestPublished

    constructor(data: CosmicSiteData) {
        this._lastPublished = {
            sectionKey: undefined,
            unpublishedDetected: false
        }

        const navigationParts = data.metadata.published_parts.map((part) => this.getNavigationPart(part));

        this._cleanSiteNav = {
            data: navigationParts,
            logoUrl: data.metadata.logo,
            domain: data.metadata.social_urls?.domain
        } as CleanedNavigation

        this.HandleNewestSection();
    }

    get CleanedNavigation(): CleanedNavigation {
        return this._cleanSiteNav;
    }

    //Get Nav Pieces
    private getNavigationPart(part: CosmicPart): NavigationPart {
        let partSlug: ParsedUrlQuery | undefined = undefined;
        let newestChpIndex = -1;

        if (part.slug && part.status === 'published') {
            partSlug = {
                partslug: part.slug
            } as ParsedUrlQuery;
        }

        const chapterData = part.metadata.metadata.part_data?.chapters;

        const mappedChapters = !chapterData ? [] :
            chapterData.map((chapterData, index) => {
                let navigationChapter: NavigationChapter;
                if (part.metadata.chapters) {
                    const relatedChapter = part.metadata.chapters.find((chapter) => chapter.metadata.metadata.key === chapterData.key);
                    navigationChapter = this.getNavigationChapter(chapterData, relatedChapter, partSlug);
                }
                else {
                    navigationChapter = this.getNavigationChapter(chapterData);
                }

                if (newestChpIndex === -1 && navigationChapter.status != PublishStatus.Public) {
                    newestChpIndex = index == 0 ? -2 : index - 1;
                }

                return navigationChapter;
            })

        return {
            slug: partSlug ?? '',
            title: part.title,
            shortTitle: part.title,
            key: part.metadata.metadata.key,
            status: mappedChapters && mappedChapters[0]?.status,
            chapters: mappedChapters
        } as NavigationPart;
    }

    private getNavigationChapter(chapterData: CosmicChapterNavData, chapter?: CosmicChapter, partSlug?: ParsedUrlQuery): NavigationChapter {
        let chapterSlug: ParsedUrlQuery | undefined = undefined;

        if (chapter?.slug && partSlug) {
            chapterSlug = {
                ...partSlug,
                chapterslug: chapter.slug
            } as ParsedUrlQuery;
        }

        const mappedSections = chapterData.sections.map((sectionData, index) => {
            if (chapter && chapterSlug && chapter.metadata.sections?.length) {
                const relatedSection = chapter.metadata.sections.find((section) => section.metadata.publish_details.key === sectionData.key);
                return this.getNavigationSection(sectionData, relatedSection, chapterSlug);
            }
            else {
                return this.getNavigationSection(sectionData);
            }
        })

        return {
            slug: chapterSlug ?? '',
            title: chapterData.title,
            shortTitle: chapterData.short,
            key: chapterData.key,
            status: mappedSections && mappedSections[0]?.status,
            sections: mappedSections
        } as NavigationChapter;
    }

    private getNavigationSection(sectionData: CosmicItemNavData, section?: CosmicSection, chapterSlug?: ParsedUrlQuery): NavigationItem {
        let sectionSlug: ParsedUrlQuery | undefined = undefined;
        const status = !section ? PublishStatus.Unpublished : this.DetermineSectionStatus(
            section.status,
            section.metadata.publish_details.patreon_release,
            section.metadata.publish_details.public_release);

        if (section?.slug && chapterSlug) {
            sectionSlug = {
                ...chapterSlug,
                sectionslug: section.slug
            } as ParsedUrlQuery;
        }

        const navigationSection = {
            slug: sectionSlug ?? '',
            title: sectionData.title,
            shortTitle: sectionData.short,
            key: sectionData.key,
            status: status
        } as NavigationItem;


        if (navigationSection.status === PublishStatus.Public && !this._lastPublished.unpublishedDetected) {
            this._lastPublished.sectionKey = navigationSection.key.toString();
        }
        else {
            this._lastPublished.unpublishedDetected = true;
        }

        return navigationSection;
    }

    //Miscellaneous
    private DetermineSectionStatus(status: string, patreonRelease: string, publicRelease: string): PublishStatus {
        if (status.toLowerCase() != "published") return PublishStatus.Unpublished;

        let currentDate = new Date();
        let patreonPublishDate = patreonRelease != undefined ? new Date(patreonRelease) : undefined;
        let publicReleaseDate = publicRelease != undefined ? new Date(publicRelease) : undefined;

        if (publicReleaseDate && publicReleaseDate <= currentDate) return PublishStatus.Public;
        if (patreonPublishDate && patreonPublishDate <= currentDate) return PublishStatus.PatreonOnly;

        return PublishStatus.Unpublished;
    }

    private HandleNewestSection() {
        if (this._lastPublished && this._lastPublished.sectionKey?.length == 3) {
            try {
                const partKey = parseInt(this._lastPublished.sectionKey[0]);
                const chapterKey = parseInt(this._lastPublished.sectionKey[1]);
                const sectionkey = parseInt(this._lastPublished.sectionKey[2]);

                if (partKey) {
                    const part = this._cleanSiteNav.data[partKey - 1]
                    part.status = PublishStatus.New;
                    if (part && chapterKey > -1) {
                        const chapter = part.chapters[chapterKey - 1];
                        chapter.status = PublishStatus.New;
                        if (chapter && sectionkey > -1) {
                            chapter.sections[sectionkey - 1].status = PublishStatus.New
                        }
                    }
                }
            } catch (error) {

            }
        }
    }
}