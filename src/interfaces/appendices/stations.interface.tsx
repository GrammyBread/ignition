import { Resource } from "../read/read-metadata.interfaces";
import { BasicObject } from "./home.interface";

export interface Name {
	first_name: string;
	additional_names: string;
	station_image: Resource;
	station_name: string;
}

export interface StationMetadata {
	orbiting_planet: string;
	station_type: string;
	station_symbol: Resource;
	relations: string;
	notes: string;
}

export interface Station extends BasicObject {
	title: string;
	id: string;
	metadata: StationMetadata;
}

export interface Arch extends BasicObject {
	metadata: ArchMetadata;
}

export interface ArchMetadata {
	arch_symbol: Resource;
	stations: Station[];
	notes: string;
}