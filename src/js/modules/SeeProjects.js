function seeMoreProjects(projetos, btn) {
    if(btn.innerText == "Ver menos") {
        seeLessProjects(projetos, btn);
    } else {
        projetos.forEach((projeto) => {
            projeto.classList.remove("d-none");
            projeto.classList.add("d-block");
        })
        btn.innerText = "Ver menos";
    }
}
function seeLessProjects(projetos, btn) {
    if(btn.innerText == "Ver mais") {
        seeMoreProjects(projetos, btn);
    } else {
        projetos.forEach((projeto, i) => {
            if(i < 3) {
                projeto.classList.add("d-block");
            } else {
                projeto.classList.add("d-none");
            }
            btn.innerText = "Ver mais";
        })
    }
}

export {
    seeMoreProjects,
    seeLessProjects
}