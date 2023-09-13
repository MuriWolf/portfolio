import typing from "./modules/typing.js";
import showTechDesc from "./modules/showTechDesc.js";
import {seeMoreProjects, seeLessProjects} from "./modules/SeeProjects.js";
import changeHeader from "./modules/changeHeader.js";

typing("Murillo Pinheiro de Oliveira", ".main-title__name");

// ======================================================

const techIcons = document.querySelectorAll(".tecnologia-icon");
const dataTechDesc = document.querySelectorAll("[data-tech-desc]");

dataTechDesc.forEach((desc => {
    if (desc.dataset.techDesc == "dafault") {
    } else {
        desc.classList.add("opacity-0");
        desc.classList.add("d-none");
        
    }
}))

techIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", (e) => {
        showTechDesc(e, techIcons, dataTechDesc);
    })
})

// ======================================================

const verMaisBtn = document.querySelector(".js-ver-mais-btn");
const projetos = document.querySelectorAll(".projeto");

seeLessProjects(projetos, verMaisBtn);
verMaisBtn.addEventListener("click", () => {
    seeMoreProjects(projetos, verMaisBtn);
})

const header = document.querySelector("#header");
window.addEventListener("scroll", () => {
    changeHeader(header)
});

// ======================================================

const openNavBtn = document.querySelector(".open-nav-btn");
const headerList = document.querySelector(".header-list");

openNavBtn.addEventListener("click", () => {
    headerList.classList.toggle("header-list--smartphone");
})