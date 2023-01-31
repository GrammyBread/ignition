import { Resource } from "../read/read-metadata.interfaces";

export interface PingPage {
	title: string;
}

export interface HomeSection {
	portrait_image: Resource;
	landscape_image: Resource;
	text: string;
	alt_image: string;
	subtext: string;
	leftfloat: boolean;
}

export interface Body {
	sections: HomeSection[];
}

export interface Qa {
	question: string;
	answer: string;
}

export interface Faq {
	qas: Qa[];
}

export interface HomeButton {
	text: string;
	url: string;
	button_type: string;
}

export interface CallToAction {
	buttons: HomeButton[];
}

export interface Hero {
	text: string;
	banner_landscape: Resource;
	banner_portrait: Resource;
}

export interface HomeMetadata {
	hero: Hero;
	body: Body;
	faq: Faq;
	call_to_actions: CallToAction;
	instagram_feed: string;
	copyright: string;
}

export interface HomePage {
	title: string;
	metadata: HomeMetadata;
}