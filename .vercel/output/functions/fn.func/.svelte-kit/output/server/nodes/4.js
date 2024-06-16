import * as server from '../entries/pages/projects/_slug_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/projects/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.QX_S7aQ9.js","_app/immutable/chunks/scheduler.L6m4aTwr.js","_app/immutable/chunks/index.Wm-maJvP.js","_app/immutable/chunks/Footer.VBgbStkh.js","_app/immutable/chunks/index.gWnlUx6_.js","_app/immutable/chunks/store.9bcWokAY.js"];
export const stylesheets = [];
export const fonts = [];
