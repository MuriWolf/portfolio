let languageDocument = document.documentElement.lang;
if (languageDocument == "pt-BR") {
    languageDocument="pt";
}

let languageContent = {
    en: {
        seeMoreProjects: "See more",
        seeLessProjects: "See less"
    },
    pt: {
        seeMoreProjects: "Ver mais",
        seeLessProjects: "Ver menos"
    }

}

function seeMoreProjects(projetos, btn) {
    if(btn.innerText == languageContent[languageDocument].seeLessProjects) {
        seeLessProjects(projetos, btn );
    } else {
        projetos.forEach((projeto) => {
            projeto.classList.remove("d-none");
            projeto.classList.add("d-block");
        })
        btn.innerText = languageContent[languageDocument].seeLessProjects;
    }
}
function seeLessProjects(projetos, btn) {
    if(btn.innerText == languageContent[languageDocument].seeMoreProjects) {
        seeMoreProjects(projetos, btn);
    } else {
        projetos.forEach((projeto, i) => {
            if(i < 3) {
                projeto.classList.add("d-block");
            } else {
                projeto.classList.add("d-none");
            }
            btn.innerText = languageContent[languageDocument].seeMoreProjects;
        })
    }
}

export {
    seeMoreProjects,
    seeLessProjects
}