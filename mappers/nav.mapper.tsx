import { CosmicSiteData } from '../interfaces/read-metadata.interfaces';
import { CleanedNavigation } from '../interfaces/cleaned-types.interface';
import MapParts from "./availability/part.mappers";

export default function MapSiteData(siteData: CosmicSiteData) : CleanedNavigation {
    const story = MapParts(siteData.metadata);
    return {
        data: story,
        logo: siteData.metadata.logo
    } as CleanedNavigation;
}