import { TableOfContentsPart, TableOfContentsChapter } from "./view-data.interfaces";

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

export interface Part
{
    title: string;
    slug: string;
    status?: string;
    metadata?: PartMetadata;
}
export interface PartMetadata
{
    table_of_contents_image: Image;
    part_image: Image;
    part_logline: string;
    chapters: Chapter[];
	table_of_contents_data: TableOfContentsPart;
}

export interface Chapter
{
    slug: string;
    title: string;
    status: string;
    metadata?: ChapterMetadata;
}

export interface ChapterMetadata
{
    sections: Section[];
    chapter_image?: Image;
    header: string;
    previous_chapter_recap?: string;
	chapter_section_data?: TableOfContentsChapter;
}

export interface Section
{
    slug: string;
    title: string;
    status: string;
    metadata?: SectionMetadata;
}

export interface Image
{
    url: string;
    imgix_url: string;
}

export interface SectionMetadata
{
    header: string;
    scripts: Script[];
    patreon_release_date: string;
    public_release_date: string;
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
