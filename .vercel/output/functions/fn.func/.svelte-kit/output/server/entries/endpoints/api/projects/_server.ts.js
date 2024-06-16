import { S as SECRET_API_KEY } from "../../../../chunks/private.js";
import { d as data } from "../../../../chunks/data.js";
function GET({ request }) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader != SECRET_API_KEY) {
    return new Response(JSON.stringify({ message: "Invalid Credencials" }), { status: 401 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}
export {
  GET
};
