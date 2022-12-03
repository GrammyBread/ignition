import { EpubDetails } from '../interfaces/epub/epub-reader.interface';
import { AppendixDocument } from '../interfaces/appendices/documents.interface';
import { FixEpubUrl } from './pathname.mapper';

export default function CreateEPubReader(
    cosmicDoc: AppendixDocument, 
    fullUrl: string,
    appId: string,
    photoURL: string,
    socialPostBody: string ) : EpubDetails {   

    const socialDescription = encodeURI(socialPostBody);
    const facebookShareLink = `https://www.facebook.com/dialog/feed?app_id=${appId}&display=page&link=${fullUrl}&redirect_uri=${fullUrl}`
    const twitterShareLink = `https://twitter.com/intent/tweet?url=${fullUrl}&text=${socialDescription}&hashtag=onlyonewaytoburnitdown`
    const redditShareLink = `https://reddit.com/submit?url=${fullUrl}&title=${cosmicDoc.title}`;
    const tumblrShareLink = `http://tumblr.com/widgets/share/tool?posttype=photo&canonicalUrl=${fullUrl}&title=${cosmicDoc.title}&content=${photoURL}`;

    return {
        title: cosmicDoc.title,
        socialUrl: fullUrl,
        coverUrl: photoURL,
        description: socialPostBody,
        largeEpub: FixEpubUrl(cosmicDoc.metadata.large_epub.url),
        smallEpub: FixEpubUrl(cosmicDoc.metadata.small_epub.url),
        twitterShare: twitterShareLink,
        facebookShare: facebookShareLink,
        redditShare: redditShareLink,
        tumblrShare: tumblrShareLink
    } as EpubDetails;
}