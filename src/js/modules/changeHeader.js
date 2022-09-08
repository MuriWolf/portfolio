export default function changeHeader(header) {
    setTimeout(()=> {
        if (scrollY > 200) {
            header.classList.remove("header-lg");
        } else {
            header.classList.add("header-lg");
        }
    }, 400)
}