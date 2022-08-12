import { getStandardSection } from "./GetStandardSection";
import { getPatreonSection } from "./PatreonOnlySection";
import { getNewSection } from "./NewSection";
import { SectionAvailability } from '../../../interfaces/view-data.interfaces';
import { ItemStatus } from "../../../mappers/availability/state.mappers";

interface getSectionProps {
    slug: string;
    availability: SectionAvailability;
}

export default function getSection( availability: SectionAvailability, chapterSlug?: string ):JSX.Element {
    let sectionSlug;
    switch ( availability.publishStatus )
    {
        case ItemStatus.New:
            sectionSlug = `${chapterSlug}/${availability.slug}`;
            return getNewSection( availability, sectionSlug );
        case ItemStatus.PatreonOnly:
            return getPatreonSection( availability );
        case ItemStatus.Public:
            sectionSlug = `${chapterSlug}/${availability.slug}`;
            return getStandardSection( true, availability, sectionSlug);
        default:
            return getStandardSection( false, availability );
    }
};