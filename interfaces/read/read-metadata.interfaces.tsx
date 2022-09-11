export interface BasicMetadata {
    key: number;
    header: string;
}

export interface BasicObject {
    slug: string;
    status: string;
    title: string;
    id: string;
}

export interface CosmicReadData {    
	published_parts: CosmicPart[];
}

export interface CosmicSiteData {
	title: string;
	content: string;
	metadata: SiteMetadata;
}

export interface SiteMetadata extends CosmicReadData {
    logo: Resource;
}

export interface CosmicPart extends BasicObject
{
    metadata?: PartMetadata;
}

export interface PartMetadata
{
    key: number;
    chapters: CosmicChapter[];
    part_image: Resource;
    part_logline: string;
	table_of_contents_data: TableOfContentsPart;
    table_of_contents_image: Resource;
}

export interface CosmicChapter extends BasicObject
{
    metadata?: ChapterMetadata;
}

export interface ChapterMetadata extends BasicMetadata
{
    chapter_image?: Resource;
	chapter_section_data?: TableOfContentsChapter;
    previous_chapter_recap?: string;
    header_scripts?: Script;
    sections: CosmicSection[];
}

export interface CosmicSection extends BasicObject
{
    metadata?: SectionMetadata;
}

export interface Resource
{
    url: string;
    imgix_url: string;
}

export interface RelatedSection {
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
	modified_by: string;
	publish_at?: any;
	unpublish_at?: any;
	type: string;
	metadata: RelatedSectionMetadata;
}

export interface RelatedSectionMetadata extends BasicMetadata
{
    patreon_release_date: string;
    public_release_date: string;
    script?: Script;
}

export interface SectionMetadata extends BasicMetadata
{
    patreon_release_date: string;
    public_release_date: string;
    previous_section?: RelatedSection;
    next_section?: RelatedSection;
    script?: Script;
}

export interface Script
{
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
    modified_by: string;
    publish_at?: string;
    unpublish_at?: string;
    type: string;
    metadata: ScriptMetadata;
}

export interface ScriptMetadata
{
    title: string;
    script_image: Resource;
    header_image: Resource;
    social_details: SocialDetail;
}

export interface SocialImage {
	url: string;
	imgix_url: string;
}

export interface SocialMetadata {
	description: string;
	social_image: SocialImage;
}

export interface SocialDetail {
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
	metadata: SocialMetadata;
}

export interface TableOfContentsItem {    
    Title: string;
    Key: number;
}

export interface TableOfContentsChapter extends TableOfContentsItem {
    Sections: TableOfContentsItem[];
}

export interface TableOfContentsPart {
    Chapters: TableOfContentsChapter[];
}
