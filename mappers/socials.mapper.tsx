import { CosmicSiteData, SocialDetail } from '../interfaces/read/read-metadata.interfaces';
import { CleanedNavigation } from '../interfaces/read/cleaned-types.interface';
import MapParts from "./availability/part.mappers";
import { Socials } from '../components/Main/Layout';

export default function MapSocialData(socialData: SocialDetail, fullUrl: string) : Socials {
    return {
        title: socialData.title,
        url: fullUrl,
        description: socialData.metadata.description,
        imageUrl: socialData.metadata.social_image.url
    } as Socials;
}