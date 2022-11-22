export interface EpubDetails extends EpubHeader {
    largeEpub: string;
    smallEpub: string;
}

export interface EpubHeader {
    title: string;
    socialUrl: string;    
    coverUrl: string;
    twitterShare: string;
    facebookShare: string;
    redditShare: string;
    tumblrShare: string;
}