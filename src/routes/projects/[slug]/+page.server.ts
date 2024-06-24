import { SECRET_API_KEY } from '$env/static/private';

export async function load({ params, fetch, url, depends }) {
	depends('data:now');
	
	async function fetchProject(slug: string) {
		const res = await fetch(`/api/projects/${slug}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				Authorization: SECRET_API_KEY,
			},
		});
		const data = await res.json();
		return data;
	}
	const res = await fetch(`/api/projects/${params.slug}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			Authorization: SECRET_API_KEY,
		},
	});
	const project = await res.json();

	const response = await fetch('/api/projects', {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			Authorization: SECRET_API_KEY,
		},
	});
	const data = await response.json();
	const projects = data.projects;
	
	let nextProject = 0;
	let previousProject = 0;

	if (project.id == projects.length - 1) {
		nextProject = projects[0].slug;
		previousProject = projects[project.id - 1].slug; 
	} else if (project.id == 0) {
		nextProject = projects[project.id + 1].slug;
		previousProject = projects[projects.length -1].slug; 
	} else {
		nextProject = projects[project.id + 1].slug;
		previousProject = projects[project.id -1].slug; 
	}

	return {
		project: project,
		nextProject: nextProject,
		previousProject: previousProject,
	};
}
