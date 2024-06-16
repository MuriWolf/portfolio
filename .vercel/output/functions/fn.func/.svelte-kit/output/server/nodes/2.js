import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.f17tpQYu.js","_app/immutable/chunks/scheduler.L6m4aTwr.js","_app/immutable/chunks/index.Wm-maJvP.js","_app/immutable/chunks/Footer.VBgbStkh.js","_app/immutable/chunks/index.gWnlUx6_.js","_app/immutable/chunks/store.9bcWokAY.js","_app/immutable/chunks/entry.LbAjPyqR.js"];
export const stylesheets = ["_app/immutable/assets/2.HQRSs9v6.css"];
export const fonts = [];
