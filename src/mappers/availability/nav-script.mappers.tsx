import { CosmicSection, RelatedSection, Resource, Script } from "../../interfaces/read/read-metadata.interfaces";
import { Section } from "../../interfaces/read/view-data.interfaces";
import { CleanSiteData } from '../../interfaces/read/clean-site-data.class';

export interface NavigationScript {
    section: Section;
    isHead: boolean;
}

export interface FeaturedScript extends NavigationScript {
    image: Resource;
    logline: string;
}

export function MakeNavigationScript(section: RelatedSection, siteData: CleanSiteData): NavigationScript | undefined {
    const mappedSection = siteData.getRelatedSection(section.id);
    const scriptMetadata = section.metadata?.script?.metadata;

    if (mappedSection && scriptMetadata) {
        return {
            section: mappedSection,
            isHead: scriptMetadata.is_intro_script || false
        } as NavigationScript;
    }

    return undefined;
}

export function MakeFeaturedScript(section: CosmicSection, siteData: CleanSiteData): FeaturedScript | undefined {
    const mappedSection = siteData.getRelatedSection(section.id);
    const scriptMetadata = section.metadata?.script?.metadata;

    if (mappedSection && scriptMetadata) {
        return {
            section: mappedSection,
            isHead: scriptMetadata.is_intro_script || false,
            image: scriptMetadata.script_image,
            logline: section.metadata?.script?.content || ''
        } as FeaturedScript;
    }

    return undefined;
}