export interface projectType {
    id: number,
    title: {pt: string, en: string},
    description: Array<string>,
    slug: string,
    technologies: Array<string>,
    codeUrl: string,
    liveUrl: string,
    images: Array<string>
}