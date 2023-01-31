import { Resource } from "../read/read-metadata.interfaces";

export interface UsedSoftware {
	software_image: Resource;
	name: string;
	url: string;
}

export interface SpecialThanks {
	image: Resource;
	name: string;
	url: string;
	blurb: string;
}

export interface LicenseMetadata {
	copyright_text: string;
	creative_commons: string;
	mit_licensed_software: UsedSoftware[];
	special_thanks: SpecialThanks[];
}

export interface LicensePage {
	title: string;
	content: string;
	metadata: LicenseMetadata;
}