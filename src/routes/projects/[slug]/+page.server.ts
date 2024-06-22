import { SECRET_API_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function load({ params, fetch, url }) {
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
	const data = await res.json();
	return {
		project: data,
	};
}
