import { Resource } from "./cosmic/cosmic-metadata.interfaces";
import { NavigationPart } from "./nav-data.interfaces";

export interface CleanedNavigation {
    data: NavigationPart[];
    logoUrl: Resource;
    domain: string;
}