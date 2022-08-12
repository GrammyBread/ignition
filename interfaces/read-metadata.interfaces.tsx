export interface BasicMetadata {
    key: number;
    header: string;
}

export interface BasicObject {
    slug: string;
    status?: string;
    title?: string;
    id: string;
}

export interface CosmicSiteData {    
	published_parts: CosmicPart[];
}

export interface NavigationData {
	title: string;
	content: string;
	metadata: SiteMetadata;
}

export interface SiteMetadata extends CosmicSiteData {
    logo: Image;
}

export interface CosmicPart extends BasicObject
{
    metadata?: PartMetadata;
}

export interface PartMetadata
{
    key: number;
    chapters: CosmicChapter[];
    part_image: Image;
    part_logline: string;
	table_of_contents_data: TableOfContentsPart;
    table_of_contents_image: Image;
}

export interface CosmicChapter extends BasicObject
{
    metadata?: ChapterMetadata;
}

export interface ChapterMetadata extends BasicMetadata
{
    chapter_image?: Image;
	chapter_section_data?: TableOfContentsChapter;
    previous_chapter_recap?: string;
    sections: CosmicSection[];
}

export interface CosmicSection extends BasicObject
{
    metadata?: SectionMetadata;
}

export interface Image
{
    url: string;
    imgix_url: string;
}

export interface SectionMetadata extends BasicMetadata
{
    patreon_release_date: string;
    public_release_date: string;
    scripts?: Script[];
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
    script_name: string;
    script_image: ScriptImage;
}

export interface ScriptImage
{
    url: string;
    imgix_url: string;
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
