import { Resource } from "../read/read-metadata.interfaces";

export interface BasicObject {
	slug: string;
	id: string;
	title: string;
}

export interface SelectOption {
	key: string;
	value: string;
}

export interface Document {
	slug: string;
}

export interface AppendixItem {
	header: string;
	image: Resource;
	document: Document;
}

export interface SpecialAppendixItem {
	header: string;
	image: Resource;
}

export interface AppendixHomeMetadata {
	map: Resource;
	appendix_items: AppendixItem[];
	character_lookup: SpecialAppendixItem;
	station_lookup: SpecialAppendixItem;
}

export interface AppendixHome {
	title: string;
	content: string;
	id: string;
	metadata: AppendixHomeMetadata;
}