import { Socials } from '../components/Main/Layout';
import { CosmicSocialDetails } from '../interfaces/read/cosmic/cosmic-metadata.interfaces';

export default function MapSocialData(socialData: CosmicSocialDetails, fullUrl: string): Socials {
    return {
        title: socialData.title,
        url: fullUrl,
        description: socialData.metadata.description,
        imageUrl: socialData.metadata.social_image.url
    } as Socials;
}