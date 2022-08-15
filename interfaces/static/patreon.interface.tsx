import { Image } from "../read/read-metadata.interfaces";

export interface Cta {
	text: string;
	url: string;
}

export interface Reason {
	text: string;
	id: string;
}

export interface PatreonMetadata {
	background: Image;
	header: string;
	body: string;
	cta: Cta;
	reasons: Reason[];
}

export interface PatreonPage {
	title: string;
	metadata: PatreonMetadata;
}