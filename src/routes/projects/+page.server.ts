import { redirect } from '@sveltejs/kit';
export const prerender = true;

export function load() {
	throw redirect(303, '/#projects');
}
