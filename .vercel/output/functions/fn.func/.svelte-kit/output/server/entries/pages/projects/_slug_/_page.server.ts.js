import { S as SECRET_API_KEY } from "../../../../chunks/private.js";
async function load({ params, fetch }) {
  const res = await fetch(`/api/projects/${params.slug}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: SECRET_API_KEY
    }
  });
  const data = await res.json();
  return {
    project: data
  };
}
export {
  load
};
