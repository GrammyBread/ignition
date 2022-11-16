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
	small_pdf: Resource;
	large_pdf: Resource;
}

export interface AppendixPage {
    title: string;
    content: string;
}