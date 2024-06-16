import { r as redirect } from "../../../chunks/index.js";
function load() {
  throw redirect(303, "/#projects");
}
export {
  load
};
