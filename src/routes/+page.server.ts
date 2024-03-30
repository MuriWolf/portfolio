import { SECRET_API_KEY, AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from '$env/static/private'
import { json, redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
    const response = await fetch("/api/projects", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": SECRET_API_KEY
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
	submitForm: async ({ request }) => {
		const { name, email, message } = await request.json();
		console.log(request);
		
		const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/submissions`

		let data = {
			records: [{
				fields: {
					name,
					email,
					message,
				},},
			],
		}

		const res = await fetch(AIRTABLE_URL, {
			method: 'POST',
			headers: {
			  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		  })

		if (res.ok) {
			return json({
				message: "sucess"
			}) 
		} else {
			return json({
				message: "failed",
				status: 404
			})
		}
	}
};