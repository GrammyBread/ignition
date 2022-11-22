export interface Logistic {
	question_1: string;
	answer_1: string;
	question_2: string;
	answer_2: string;
}

export interface Story_detail {
	header: string;
	ela_details: string;
	zak_details: string;
	footer: string;
}

export interface HomeMetadata {
	page_header: string;
	logistics: Logistic;
	story_details: Story_detail;
}

export interface HomePage {
	title: string;
	content: string;
	metadata: HomeMetadata;
}

export interface PingPage {
	title: string;
}