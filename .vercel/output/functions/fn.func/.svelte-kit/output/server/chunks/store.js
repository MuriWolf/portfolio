import { w as writable } from "./index2.js";
const openAsideMobile = writable(false);
const languageSelected = writable("en");
const textContent = writable();
const projectName = writable("");
export {
  languageSelected as l,
  openAsideMobile as o,
  projectName as p,
  textContent as t
};
