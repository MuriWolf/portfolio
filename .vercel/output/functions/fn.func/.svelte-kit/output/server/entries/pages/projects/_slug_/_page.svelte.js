import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute, v as validate_component, k as each } from "../../../../chunks/ssr.js";
import { K as techIcons, L as Carousel, M as Carousel_content, N as Carousel_item, P as Carousel_previous, Q as Carousel_next, R as Root, T as Trigger, J as Tooltip_content, O as Button, U as Footer } from "../../../../chunks/Footer.js";
import { l as languageSelected, p as projectName, t as textContent } from "../../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $languageSelected, $$unsubscribe_languageSelected;
  let $$unsubscribe_projectName;
  let $textContent, $$unsubscribe_textContent;
  $$unsubscribe_languageSelected = subscribe(languageSelected, (value) => $languageSelected = value);
  $$unsubscribe_projectName = subscribe(projectName, (value) => value);
  $$unsubscribe_textContent = subscribe(textContent, (value) => $textContent = value);
  let { data } = $$props;
  const project = data.project;
  let api;
  let current = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (api) {
        api.scrollSnapList().length;
        current = api.selectedScrollSnap() + 1;
        api.on("select", () => {
          current = api.selectedScrollSnap() + 1;
        });
      }
    }
    $$rendered = `<main class="max-w-[1340px] mx-auto flex flex-col gap-4 xs:gap-8 my-4 xs:my-8"><section class="mx-4 xs:mx-8 rounded-2xl py-12 px-4 xs:px-6 sm:px-8 lg:px-16 shadow-xl shadow-stone-900 gradient-blue-ish"><div class="${"relative z-10 max-w-[800px] bg-gradient-to-t from-[#f7f7f715] to-[#f7f7f75b] backdrop-blur-sm bg-clip-padding border-0 p-0 sm:px-3 rounded-2xl flex flex-col mx-auto shadow-md shadow-black/20 " + escape(
      project.images.length == 1 ? "sm:py-3" : "sm:pt-7 sm:pb-4",
      true
    )}"><div class="flex items-center gap-6 mb-3"><a href="/#projects" class="bg-black/50 hover:brightness-90 active:scale-95 transition-all w-[40px] h-[40px] justify-center items-center rounded-full hidden md:flex" data-svelte-h="svelte-1duev8r"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="white" width="24" height="24"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg></a> <h1 class="flex-1 text-white text-center font-title font-semibold text-shadow-sm text-lg max-xs:uppercase xs:text-xl sm:text-2xl md:text-3xl bg-opacity-75 p-2 rounded-lg mr-12">${escape(project.title[$languageSelected])}</h1></div> ${project.images.length == 1 ? `<div class="mx-auto rounded-2xl overflow-hidden inline-block shadow-custom-lg shadow-black/30"><img${add_attribute("src", project.images[0], 0)}${add_attribute("alt", `${project.title[$languageSelected]} project screenshot`, 0)} height="636" width="736" class="block mx-auto w-full"></div>` : `${validate_component(Carousel, "Carousel.Root").$$render(
      $$result,
      {
        opts: {
          skipSnaps: true,
          loop: true,
          breakpoints: {}
        },
        plugins: [],
        // Autoplay({
        class: "w-full rounded-2xl overflow-hidden bg-opacity-0 bg-black",
        api
      },
      {
        api: ($$value) => {
          api = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, { class: "" }, {}, {
            default: () => {
              return `${each(project.images, (image) => {
                return `${validate_component(Carousel_item, "Carousel.Item").$$render($$result, { class: "flex flex-col gap-5" }, {}, {
                  default: () => {
                    return `<img${add_attribute("src", image, 0)}${add_attribute("alt", `${project.title[$languageSelected]} project screenshot`, 0)} height="636" width="736" class="rounded-2xl object-cover h-full w-full"> `;
                  }
                })}`;
              })}`;
            }
          })} <footer class="p-2 mt-2 flex items-center justify-center gap-4 max-xs:px-4 pb-0">${validate_component(Carousel_previous, "Carousel.Previous").$$render($$result, { style: "all: unset;" }, {}, {
            default: () => {
              return `<button class="text-white active:scale-90 transition-all ease-in-out duration-150 flex" data-svelte-h="svelte-1v0pbi"><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"></path></svg></button>`;
            }
          })} <div class="flex gap-4 items-center justify-center">${each(project.images, (image) => {
            return `<button class="${"w-4 h-4 border-2 border-white transition-all duration-300 rounded-full " + escape(
              current == project.images.indexOf(image) + 1 ? " bg-white" : "",
              true
            )}"></button>`;
          })}</div> ${validate_component(Carousel_next, "Carousel.Next").$$render($$result, { style: "all: unset;" }, {}, {
            default: () => {
              return `<button class="text-white active:scale-90 transition-all ease-in-out duration-150" data-svelte-h="svelte-f2828u"><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg></button>`;
            }
          })}</footer>`;
        }
      }
    )}`}</div></section> <section class="relative bg-black py-12 px-8 lg:px-16 rounded-2xl mx-4 xs:mx-8 text-center shadow-xl shadow-stone-900">${project.description[$languageSelected] ? `<h2 class="text-gray-50 font-title font-semibold text-3xl mb-4">${escape($textContent.projectPage.description[$languageSelected])}</h2> <div class="flex flex-col gap-4 max-w-lg mx-auto mb-12">${each(project.description[$languageSelected], (paragraph) => {
      return `<p class="text-gray-100 leading-7 tracking-wide text-start">${escape(paragraph)}</p>`;
    })}</div>` : ``} <h2 class="text-gray-50 font-title font-semibold text-3xl mb-4">${escape($textContent.projectPage.techs[$languageSelected])}</h2> <div class="max-w-lg flex flex-wrap flex-row justify-center gap-4 mx-auto mb-12">${each(techIcons.filter((techIcon) => project.technologies.includes(techIcon.title.toLowerCase())), (item) => {
      return `${validate_component(Root, "Tooltip.Root").$$render($$result, { openDelay: 0 }, {}, {
        default: () => {
          return `${validate_component(Trigger, "Tooltip.Trigger").$$render(
            $$result,
            {
              class: "min-w-16 sm:min-w-24 hover:backdrop-brightness-200 shadow-md rounded-xl overflow-hidden transition-all duration-300 ease-in-outhover:shadow-none"
            },
            {},
            {
              default: () => {
                return `<img${add_attribute("src", item.url, 0)} alt="" class="rounded-xl p-1"> `;
              }
            }
          )} ${validate_component(Tooltip_content, "Tooltip.Content").$$render($$result, { sideOffset: 12 }, {}, {
            default: () => {
              return `<p class="font-semibold">${escape(item.title)}</p> `;
            }
          })} `;
        }
      })}`;
    })}</div> <h2 class="text-gray-50 font-title font-semibold text-3xl mb-4">${escape($textContent.projectPage.depth[$languageSelected])}</h2> <div class="flex max-sm:flex-col justify-center gap-6 items-center max-w-lg mx-auto mb-12"><a${add_attribute("href", project.liveUrl, 0)} class="${"transition-all duration-300 " + escape(
      project.codeUrl === "private" ? "w-full sm:w-3/5 hover:w-full" : "w-full flex-[2] hover:flex-[3] focus-within:flex-[3]",
      true
    )}" target="_blank">${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "bg-white w-full block text-black font-title font-bold text-lg xs:text-xl rounded-[5px]  active:bg-white hover:bg-white hover:brightness-90 active:scale-95 transition-all h-10 shadow-inner-sm shadow-black"
      },
      {},
      {
        default: () => {
          return `Live View`;
        }
      }
    )}</a> ${!(project.codeUrl === "private") ? `<a${add_attribute("href", project.codeUrl, 0)} class="flex-[2] hover:flex-[3] focus-within:flex-[3] transition-all duration-300 w-full" target="_blank">${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "flex items-center h-10 pb-1 bg-transparent mx-auto hover:w-full text-white border-2 border-white font-title font-medium text-lg rounded-[5px]  shadow-[#00000066] active:bg-transparent hover:bg-transparent hover:brightness-90 active:scale-95 transition-all duration-300 w-full"
      },
      {},
      {
        default: () => {
          return `Discover More`;
        }
      }
    )}</a>` : ``}</div>  <div class="flex justify-center gap-6 items-center max-w-lg mx-auto"><a href="/#projects" class="flex-1 w-full -mt-5">${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "flex items-center h-10 pb-1 bg-transparent mx-auto hover:w-full text-white font-title font-medium text-lg rounded-[5px]  shadow-[#00000066] active:bg-transparent hover:bg-transparent hover:brightness-90 active:scale-95 transition-all duration-300 w-full sm:w-3/5"
      },
      {},
      {
        default: () => {
          return `See Other Projects`;
        }
      }
    )}</a></div></section></main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
  } while (!$$settled);
  $$unsubscribe_languageSelected();
  $$unsubscribe_projectName();
  $$unsubscribe_textContent();
  return $$rendered;
});
export {
  Page as default
};
