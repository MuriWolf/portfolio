export async function load() {
    // http://localhost:5173/
    const response = await fetch("murillopoliveira.vercel.app/api", {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })

    const projects = await response.json()

    return projects
}