// import { SECRET_API_KEY } from '$env/static/private'
import { env } from '$env/dynamic/private'
import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
    const response = await fetch("/api/projects", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": env.SECRET_API_KEY
        }
    })

    const projects = await response.json()
    return projects
}

export const actions = {
	setLanguage: async ({ url, cookies }) => {
		const language = url.searchParams.get("language");
		// const redirectTo = url.searchParams.get("redirectTo");

		if (language) {
			cookies.set("language", language, {
				path: "/",
				maxAge: 60 * 60 * 24 * 365,
			});
		}

		// throw redirect(303, redirectTo ?? "/");
        throw redirect(303, "/");
	},
};