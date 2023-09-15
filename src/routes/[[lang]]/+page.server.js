const content = {
    pt: {
        nav: ['Intro', 'Sobre', 'Projetos', 'Contato'],
        heroTitle: 'Olá'
    },
    en: {
        nav: ['Intro', 'About', 'Projects', 'Contact'],
        heroTitle: 'Hello'
    },
}

export function load({params}) {
    return {
        // @ts-ignore
        content: content[params.lang ?? 'en']
    }
}