import { S as SECRET_API_KEY, A as AIRTABLE_API_KEY, a as AIRTABLE_BASE_ID } from "../../chunks/private.js";
import { r as redirect, j as json } from "../../chunks/index.js";
async function load({ fetch: fetch2 }) {
  const response = await fetch2("/api/projects", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: SECRET_API_KEY
    }
  });
  const projects = await response.json();
  return projects;
}
const actions = {
  setLanguage: async ({ url, cookies }) => {
    const language = url.searchParams.get("language");
    if (language) {
      cookies.set("language", language, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365
      });
    }
    throw redirect(303, "/");
  },
  submitForm: async ({ request }) => {
    const { name, email, message } = await request.json();
    console.log(request);
    const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/submissions`;
    let data = {
      records: [
        {
          fields: {
            name,
            email,
            message
          }
        }
      ]
    };
    const res = await fetch(AIRTABLE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      return json({
        message: "sucess"
      });
    } else {
      return json({
        message: "failed",
        status: 404
      });
    }
  }
};
export {
  actions,
  load
};
