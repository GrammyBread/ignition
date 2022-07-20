import { NavigationData } from '../interfaces/read-metadata.interfaces';
import { NavigationList, NavChapter, NavigationLink } from '../components/NavigationList/NavigationList';
import { NavPartProps } from '../components/NavigationList/NavigationPart';


export default function MapNavigation(navigationData: NavigationData): NavigationList {
    let parts = navigationData.metadata.published_parts.map((part) => {
        let chapters:NavigationLink[] | undefined = undefined;
        if(part.metadata?.chapters != undefined) {
            let chapters = part.metadata.chapters.map((chapter) => {
                let sections:NavigationLink[] | undefined = undefined;
                if(chapter.metadata?.sections != undefined) {
                    sections = chapter.metadata.sections.map((section) => {
                        return {
                            slug: section.slug,
                            title: section.title
                        } as NavigationLink
                    })
                }
                return {
                    link: {
                        slug: chapter.slug,
                        title: chapter.title
                    } as NavigationLink,
                    sections: sections
                } as NavChapterprops;
            })
            return {
                link: {
                    slug: part.slug,
                    title: part.title
                },
                chapters: chapters
            } as NavPart;
        }
    });
    return {
        parts: parts
    } as NavigationList
}