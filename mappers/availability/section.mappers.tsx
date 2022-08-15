import { MakeDefaultUnpublishedItem, MakeDefaultTOCItem } from './shared.mappers';
import { TableOfContentsItem } from '../../interfaces/read/read-metadata.interfaces';
import { Section } from "../../interfaces/read/view-data.interfaces";
import { CleanedCosmicSection } from '../../interfaces/read/cleaned-types.interface';
import { DetermineSectionStatus } from "./state.mappers";

function CompleteSectionSetup(section: Section, key?: number) {
    if (key != undefined) {
        section.key = key;
    }
    return section;
}

function MakeDefaultCosmicSection(cosmicSection: CleanedCosmicSection): Section {
    let partialChapter = { ...MakeDefaultUnpublishedItem(cosmicSection) } as Section;
    return CompleteSectionSetup(partialChapter, cosmicSection.key);
}

export function MakeDefaultTOCSection(tocSection: TableOfContentsItem): Section {
    let partialChapter = { ...MakeDefaultTOCItem(tocSection) } as Section;
    return CompleteSectionSetup(partialChapter, tocSection.Key);
}

export function MapSection(cosmicSection: CleanedCosmicSection, slugBase: string): Section {
    if(cosmicSection.status != undefined) {
        return {
            id: cosmicSection.id,
            header: cosmicSection.header,
            key: cosmicSection.key,
            itemSlug: `${slugBase}/${cosmicSection.slug}`,
            publishStatus: DetermineSectionStatus(cosmicSection.status, cosmicSection.patreon_release_date, cosmicSection.public_release_date),
            releaseDate: cosmicSection.public_release_date
        } as Section;
    }
    return MakeDefaultCosmicSection(cosmicSection)
}