import { CosmicChapterNavData, CosmicPartNavData } from "./cosmic-navigation-metadata.interfaces";

export interface Resource
{
    url: string;
    imgix_url: string;
}

export interface CosmicSiteData {
	title: string;
	content: string;
	metadata: CosmicSiteMetadata;
}

export interface CosmicSiteMetadata {    
	published_parts: CosmicPart[];
    logo?: Resource;
    social_urls?: CosmicSocialUrls;
}

export interface CosmicSocialUrls {
    domain: string;
    one: string;
    two: string;
}

export interface CosmicPart
{
    title: string;
    slug: string;
    status: string;
    metadata: CosmicPartInfo;
}

export interface CosmicPartInfo
{
    metadata: CosmicPartMetadata;
    images?: CosmicPartImages;
    chapters: CosmicChapter[];
}

export interface CosmicPartMetadata {
    key: number;
    logline?: string;
    part_data?: CosmicPartNavData;
}

export interface CosmicPartImages {
    table_of_contents: Resource;
    thumbnail: Resource;
}

export interface CosmicChapter
{
    slug: string;
    status: string;
    metadata: CosmicChapterInfo;
}

export interface CosmicChapterInfo
{
    metadata: CosmicChapterMetadata;
    intro?: CosmicSection;
    sections?: CosmicSection[];
    recap?: string;
}

export interface CosmicChapterMetadata {
    title?: string;
    key: number;
    section_data: CosmicChapterNavData;
    background?: Resource;
}

export interface CosmicSection
{
    slug: string;
    status: string;
    metadata: CosmicSectionInfo;
}

export interface CosmicSectionInfo {
    metadata: CosmicSectionMetadata;
    images?: CosmicSectionImages;
    seo?: CosmicSocialDetails;
    publish_details: CosmicSectionPublish;
    related_sections?: CosmicRelatedSections;
    blocks?: CosmicScript[];
}

export interface CosmicSectionMetadata
{
    title: string;
    catch: string;
    is_header: boolean;
}

export interface CosmicSectionImages {
    hero: Resource;
    background: Resource;
}

export interface CosmicSectionPublish {
    key: number;
    patreon_release: string;
    public_release: string;
}

export interface CosmicRelatedSections {
    previous?: CosmicSection;
    next?: CosmicSection;
}

export interface CosmicSocialDetails {
	id: string;
	slug: string;
	title: string;
	content: string;
	bucket: string;
	created_at: string;
	created_by: string;
	modified_at: string;
	created: string;
	status: string;
	thumbnail: string;
	published_at: string;
	type: string;
	metadata: CosmicSocialMetadata;
}

export interface CosmicSocialImage {
	url: string;
	imgix_url: string;
}

export interface CosmicScript {
    metadata: CosmicScriptMetadata;
}

export interface CosmicSocialMetadata {
	description: string;
	social_image: CosmicSocialImage;
}

export interface CosmicScriptMetadata {
    id: string;
    pieces: CosmicScriptPiece[];
}

export interface CosmicScriptPiece {
    type: {
        key: string;
    }
    image?: Resource;
    a11y?: string;
    is_large_image?: boolean;
    id?: string;
    content: string;
}