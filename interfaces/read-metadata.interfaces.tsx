export interface Part
{
    title: string;
    slug: string;
    metadata?: PartMetadata;
}
export interface PartMetadata
{
    table_of_contents_image: Image;
    part_logline: string;
    chapters: Chapter[];
	table_of_contents_data: TableOfContents;
}

export interface TableOfContents {
	chapters: Chapter[];
}

export interface Chapter
{
    slug: string;
    title: string;
    metadata?: ChapterMetadata;
}

export interface ChapterMetadata
{
    sections: Section[];
    chapter_image?: Image;
    previous_chapter_recap?: string;
	chapter_section_data?: Chapter_section_data;
}

export interface Section
{
    slug: string;
    title: string;
    metadata?: SectionMetadata;
}

export interface Image
{
    url: string;
    imgix_url: string;
}

export interface SectionMetadata
{
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

export interface Chapter_section_data {
	title: string;
	sections: string[];
}
