// import { SECRET_API_KEY } from '$env/static/private'
import { env } from '$env/dynamic/private'

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