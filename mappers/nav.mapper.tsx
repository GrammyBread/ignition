import { CosmicSiteData } from '../interfaces/read/read-metadata.interfaces';
import { CleanedNavigation } from '../interfaces/read/cleaned-types.interface';
import MapParts from "./availability/part.mappers";

export default function MapSiteData(siteData: CosmicSiteData) : CleanedNavigation {
    const story = MapParts(siteData.metadata);
    return {
        data: story,
        logo: siteData.metadata.logo
    } as CleanedNavigation;
}