import { CleanSiteData } from "../../../interfaces/read/clean-site-data.class";
import MapParts from "../../../mappers/availability/part.mappers";
import { CosmicSiteData } from '../../../interfaces/read/read-metadata.interfaces';

export default function CleanUpSiteData(siteData: CosmicSiteData) : CleanSiteData {
    const story = MapParts(siteData.metadata);
    return new CleanSiteData({story, logo: siteData.metadata.logo, domain: siteData.domain})
}