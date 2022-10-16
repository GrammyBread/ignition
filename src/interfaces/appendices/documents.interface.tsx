import { Resource, SocialDetail } from '../read/read-metadata.interfaces';
import { BasicObject } from './home.interface';

export interface AvailableAppendixDocs {
	slug: string;
}

export interface AppendixDocument extends BasicObject{
	metadata: AppendixDocumentMetadata;
}

export interface AppendixDocumentMetadata {
	social_details: SocialDetail;
	background_image: Resource;
	description: string;
	large_html: string;
	small_html: string;
}

export interface AppendixPage {
    title: string;
    content: string;
}