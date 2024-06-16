import { d as data } from "../../chunks/data.js";
function load({ cookies }) {
  let languageSelected = cookies.get("language");
  return {
    content: data.content,
    language: languageSelected
  };
}
export {
  load
};
