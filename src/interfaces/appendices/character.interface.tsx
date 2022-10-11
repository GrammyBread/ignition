import { Resource } from "../read/read-metadata.interfaces";
import { BasicObject } from "./home.interface";

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

export interface Character extends BasicObject {
	metadata: CharacterMetadata;
}