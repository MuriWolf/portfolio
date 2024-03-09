import { SECRET_API_KEY } from '$env/static/private'
import type { projectType } from '$lib/types/projectType';
import data from "../../../../../data.json";

export function GET({ request, params }) {                              
    const authHeader = request.headers.get("Authorization");
    if (authHeader != SECRET_API_KEY) {
        return new Response(JSON.stringify({ message: 'Invalid Credencials' }), { status: 401 })
    }
    let requestedProject: projectType | undefined = data.projects.find((el: any) => el.slug == params.slug);
    if (requestedProject) {
        return new Response(JSON.stringify(requestedProject), { status: 200 })
    } else {
        return new Response(JSON.stringify({message: 'Project not found'}), { status: 401 })
    }
}