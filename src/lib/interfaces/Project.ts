export interface Project {
	id: number;
	title: { pt: string; en: string; };
	description: { pt: string[]; en: string[]; };
	slug: string;
	technologies: string[];
	codeUrl: string;
	liveUrl: string;
	images: string[]; 
}