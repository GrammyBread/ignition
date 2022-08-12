import { CosmicSiteData } from '../../interfaces/read-metadata.interfaces';
import { NavigationList, NavigationLink } from '../../components/Main/Navigation/NavigationList/NavigationList';
import { NavPartProps } from '../../components/Main/Navigation/NavigationList/NavigationPart';
import { NavChapterProps } from '../../components/Main/Navigation/NavigationList/NavigationChapter';

export default function MapSiteData(navigationData: CosmicSiteData): NavigationList {
    let parts = navigationData.metadata.published_parts.map((part) => {
        let chapters:NavigationLink[] | undefined = undefined;
        if(part.metadata?.chapters != undefined) {
            let chapters = part.metadata.chapters.map((chapter) => {
                let sections:NavigationLink[] | undefined = undefined;
                if(chapter.metadata?.sections != undefined) {
                    sections = chapter.metadata.sections.map((section) => {
                        return {
                            slug: `/read/${part.slug}/${chapter.slug}/${section.slug}`,
                            title: section.metadata?.header
                        } as NavigationLink
                    })
                }
                return {
                    link: {
                        slug: `/read/${part.slug}/${chapter.slug}`,
                        title: chapter.metadata?.header
                    } as NavigationLink,
                    sections: sections
                } as NavChapterProps;
            })
            return {
                link: {
                    slug: `/read/${part.slug}`,
                    title: part.title
                },
                chapters: chapters
            } as NavPartProps;
        }
    });
    return {
        parts: parts
    } as NavigationList
}