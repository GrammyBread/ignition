export interface CosmicResponse<Type>
{
    data: Data<Type>;
}

export interface Data<Type>
{
    getObjects: GetObjects<Type>;
}

export interface GetObjects<Type>
{
    objects: Type[];
}

export interface Part
{
    title: string;
    slug: string;
    metadata?: PartMetadata;
}
export interface PartMetadata
{
    part_image: Image;
    part_logline: string;
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
}

export interface Section
{
    slug: string;
    title: string;
    metadata?: SectionMetadata;
}

export interface SectionMetadata
{

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

