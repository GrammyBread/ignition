import { getStandardSection } from "./GetStandardSection";
import { getPatreonSection } from "./PatreonOnlySection";
import { getNewSection } from "./NewSection";
import { ItemStatus } from "../../../mappers/availability/state.mappers";
import { Section } from "../../../interfaces/view-data.interfaces";

export default function getSection(availability: Section): JSX.Element {
    switch (availability.publishStatus) {
        case ItemStatus.New:
            return getNewSection(availability);
        case ItemStatus.PatreonOnly:
            return getPatreonSection(availability);
        case ItemStatus.Public:
            return getStandardSection(true, availability);
        default:
            return getStandardSection(false, availability);
    }
};