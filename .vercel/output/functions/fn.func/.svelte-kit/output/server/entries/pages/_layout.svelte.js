import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute } from "../../chunks/ssr.js";
import { t as textContent, l as languageSelected, p as projectName } from "../../chunks/store.js";
const css = {
  code: "@keyframes from-left{0%{transform:rotateX(50deg) translateX(-200vw) skewX(-50deg);opacity:1}100%{transform:rotateX(0deg) translateX(0) skewX(0deg);opacity:1}}@keyframes from-right{0%{transform:rotateX(50deg) translateX(200vw) skewX(-50deg);opacity:1}100%{transform:rotateX(0deg) translateX(0) skewX(0deg);opacity:1}}@keyframes slide-bottom{0%{transform:translateY(-100vh)}100%{transform:translateY(0px)}}@keyframes slide-top{0%{transform:translateY(100vh)}100%{transform:translateY(0px)}}@keyframes swing-right-bck{0%{transform:rotateY(-180deg);transform-origin:right}100%{transform:rotateY(0);transform-origin:right}}@keyframes slide-fwd-center{0%{transform:translateZ(0) perspective(200px)}100%{transform:translateZ(160px) perspective(200px)}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $projectName, $$unsubscribe_projectName;
  let $languageSelected, $$unsubscribe_languageSelected;
  $$unsubscribe_projectName = subscribe(projectName, (value) => $projectName = value);
  $$unsubscribe_languageSelected = subscribe(languageSelected, (value) => $languageSelected = value);
  let { data } = $$props;
  const linkContent = {
    title: {
      en: "Murillo P. de Oliveira's Portfolio",
      pt: "Portfolio de Murillo P. de Oliveira"
    },
    description: {
      en: "Young front-end web Developer",
      pt: "Jovem desenvolvedor front-end web"
    }
  };
  textContent.set(data.content);
  languageSelected.set(data.language || "en");
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_projectName();
  $$unsubscribe_languageSelected();
  return `${$$result.head += `<!-- HEAD_svelte-ueshge_START -->${$projectName == "" ? `${$$result.title = `<title>Murillo | Web Dev</title>`, ""}` : `${$$result.title = `<title>${escape($projectName)} | Murillo</title>`, ""}`}<meta name="description"${add_attribute("content", linkContent.description[$languageSelected], 0)}><meta name="keywords" content="web development front-end brazil programming freelance developer"><meta name="og:image"${add_attribute("content", `/images/logo.png`, 0)}><!-- HEAD_svelte-ueshge_END -->`, ""} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
