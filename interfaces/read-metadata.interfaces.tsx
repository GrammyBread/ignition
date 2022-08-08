import { TableOfContentsPart, TableOfContentsChapter } from "./view-data.interfaces";

export interface BasicMetadata {
    key: number;
    header: string;
}

export interface BasicObject {
    slug: string;
    status?: string;
    title?: string;
}

export interface NavigationData {
	title: string;
	content: string;
	metadata: NavMetadata;
    navWidth: number;
}

export interface NavMetadata {
	published_parts: Part[];
    logo: Image;
}

export interface Part extends BasicObject
{
    metadata?: PartMetadata;
}

export interface PartMetadata
{
    key: number;
    chapters: Chapter[];
    part_image: Image;
    part_logline: string;
	table_of_contents_data: TableOfContentsPart;
    table_of_contents_image: Image;
}

export interface Chapter extends BasicObject
{
    metadata?: ChapterMetadata;
}

export interface ChapterMetadata extends BasicMetadata
{
    chapter_image?: Image;
	chapter_section_data?: TableOfContentsChapter;
    previous_chapter_recap?: string;
    sections: Section[];
}

export interface Section extends BasicObject
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
    scripts: Script[];
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
