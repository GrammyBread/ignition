import { StandardSection } from "./Standard/StandardSection";
import { PatreonSection } from "./Patreon/PatreonSection";
import { NavigationSection, PublishStatus } from "../../../interfaces/read/nav-data.interfaces";
import { NewSection } from "./New/NewSection";

export default function getSection(availability: NavigationSection): JSX.Element {
    switch (availability.status) {
        case PublishStatus.New:
            return NewSection(availability);
        case PublishStatus.PatreonOnly:
            return PatreonSection(availability);
        case PublishStatus.Public:
            return StandardSection(true, availability);
        default:
            return StandardSection(false, availability);
    }
};