import { SECRET_API_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, cookies }) {
	const response = await fetch('/api/projects', {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			Authorization: SECRET_API_KEY,
		},
	});	

	const projects = await response.json();
	return projects;
}

export const actions = {
	setLanguage: async ({ url, cookies }) => {
		const language = url.searchParams.get('language');
		
		if (language) {
			cookies.set('language', language, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
			});
		}
	},
};