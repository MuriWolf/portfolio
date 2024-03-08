import { SECRET_API_KEY } from '$env/static/private'
import projects from "../../../../../data.json";

export function GET({ request, params }) {                              
    const authHeader = request.headers.get("Authorization");
    if (authHeader != SECRET_API_KEY) {
        return new Response(JSON.stringify({ message: 'Invalid Credencials' }), { status: 401 })
    }
    return new Response(JSON.stringify(projects), { status: 200 })
}