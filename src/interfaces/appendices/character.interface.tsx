import { Resource } from "../read/read-metadata.interfaces";
import { BasicObject, SelectOption } from './home.interface';

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
	pronunciation_section: Pronunciation;
	card_type: SelectOption
}

export interface Character extends BasicObject {
	metadata: CharacterMetadata;
}

export interface Pronunciation {
	header: string;
	audio: Resource;
}
