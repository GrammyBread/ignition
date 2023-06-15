import { CosmicSiteData } from "../../../interfaces/read/cosmic/cosmic-metadata.interfaces";
import { CleanSiteData } from "../../availability/class/clean-site-data.class";
import { NavigationCleaner } from "../../availability/class/navigation-cleaner.class";

export default function CleanUpSiteData(siteData: CosmicSiteData) : CleanSiteData {
    const navCleaner = new NavigationCleaner(siteData);
    return new CleanSiteData(navCleaner.CleanedNavigation);
}