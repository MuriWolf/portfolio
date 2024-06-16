import { SECRET_API_KEY } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

export async function load({ fetch }) {
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

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false, // Use `true` for port 465, `false` for all other ports
	auth: {
	  user: "maddison53@ethereal.email",
	  pass: "jn7jnAPss4f63QBp6D",
	},
  });

  async function main() {
	// send mail with defined transport object
	const info = await transporter.sendMail({
	  from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
	  to: "murillopo.dev@gmail.com",
	  subject: "Contact from portfolio",
	  text: "Hello world?", 
	});

	// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export const actions = {
	setLanguage: async ({ url, cookies }) => {
		const language = url.searchParams.get('language');
		// const redirectTo = url.searchParams.get("redirectTo");

		if (language) {
			cookies.set('language', language, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
			});
		}

		// throw redirect(303, redirectTo ?? "/");
		throw redirect(303, '/');
	},
	submitForm: async ({ request }) => {
		// const { name, email, message } = await request.json();

		main().catch(console.error);

		// const res = await fetch(AIRTABLE_URL, {
		// 	method: 'POST',
		// 	headers: {
		// 		Authorization: `Bearer ${AIRTABLE_API_KEY}`,
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(data),
		// });

		// if (res.ok) {
		// 	return json({
		// 		message: 'sucess',
		// 	});
		// } else {
		// 	return json({
		// 		message: 'failed',
		// 		status: 404,
		// 	});
		// }
	},
};
