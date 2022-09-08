// funcao que mostra a descrição da tecnologia selecionada

export default function showTechDesc(e, techIcons, dataTechDesc) {
    techIcons.forEach((icon_inside) => {
        dataTechDesc.forEach((desc => {
            if (e.target.dataset.techIcon != desc.dataset.techDesc) {
                desc.classList.add("d-none");
                desc.classList.add("opacity-0");
            } else {
                if (desc.classList.contains("d-none")) {
                    desc.classList.remove("d-none");
                    setTimeout(()=> { desc.classList.remove("opacity-0");}, 200)
                }
            }
        }))
    })
}