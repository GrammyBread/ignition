import { Resource } from "../read/read-metadata.interfaces";

export interface Cta {
	text: string;
	url: string;
}

export interface Reason {
	text: string;
	id: string;
	catch: string;
}

export interface PatreonMetadata {
	patreon_logo: Resource;
	background: Resource;
	header: string;
	body: string;
	cta: Cta;
	reasons: Reason[];
}

export interface PatreonPage {
	title: string;
	metadata: PatreonMetadata;
}