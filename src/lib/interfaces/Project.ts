export interface Project {
	id: number;
	title: { pt: string, en: string; };
	type: { pt: string, en: string; },
	myRole: { pt: string, en: string; },
	abstract: { pt: string, en: string; },
	// description: { pt: string[], en: string[]; };
	description: {
		overview: { pt: string, en: string; } | undefined, 
		features: { pt: string, en: string; } | undefined,
		challenges: { pt: string, en: string; } | undefined
	}
	slug: string;
	technologies: string[];
	codeUrl: string;
	liveUrl: string;
	images: string[]; 
}

// "description": {
// 	"overview": { "pt": "", "en": "" }, 
// 	"features": { "pt": "", "en": "" },
// 	"challenges": { "pt": "", "en": "" }
// },