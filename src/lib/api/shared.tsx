import { useRouter } from "next/router";
import { CosmicSection } from "../../interfaces/read/read-metadata.interfaces";
import { getMostRecentSections } from "./client";

export const minifyProps = (props: string) => {
    let smallProp = props.replace(/(?:\r\n|\r|\n)/g, '');
    return smallProp;
}

export function GetRequestedResource(): string {
    const router = useRouter();
    const path = router.pathname;
    const pathParts = path.split("/");
    return pathParts[pathParts.length - 1];
}

export async function GetFeaturedSection(): Promise<CosmicSection | undefined> {
    var sections = await getMostRecentSections();

    if (sections.length === 0) return undefined;
    else if (sections.length === 1) return sections[0];
    else {
        var sectionsSorted = sections.sort(SortSectionsByPublishDate);
        return sectionsSorted[0];
    }
}

function SortSectionsByPublishDate(sectionA: CosmicSection, sectionB: CosmicSection) {
    if (!sectionA.metadata) { return 1 }
    else if (!sectionB.metadata) { return -1 }

    var sectionADate = new Date(sectionA.metadata.public_release_date);
    var sectionBDate = new Date(sectionB.metadata.public_release_date);

    if (sectionADate === sectionBDate) { return 0 }
    else if (sectionADate > sectionBDate) { return -1 }
    else { return 1 }

}