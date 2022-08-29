import { Resource } from "../read/read-metadata.interfaces";

export interface Name {
	first_name: string;
	additional_names: string;
	station_image: Resource;
	station_name: string;
}


export interface CharacterMetadata {
	name: Name;
	description: string;
	character_image: Resource;
	pronunciation: Resource;
}

export interface Character {
	title: string;
	metadata: CharacterMetadata;
}