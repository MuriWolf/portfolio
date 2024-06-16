import { S as SECRET_API_KEY } from "../../../../../chunks/private.js";
import { d as data } from "../../../../../chunks/data.js";
function GET({ request, params }) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader != SECRET_API_KEY) {
    return new Response(JSON.stringify({ message: "Invalid Credencials" }), { status: 401 });
  }
  let requestedProject = data.projects.find(
    (el) => el.slug == params.slug
  );
  if (requestedProject) {
    return new Response(JSON.stringify(requestedProject), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "Project not found" }), { status: 401 });
  }
}
export {
  GET
};
