import { writable } from 'svelte/store';

export const openAsideMobile = writable(false);
export const languageSelected = writable("en");
export const textContent: any = writable(); 
// export const currentLanguage = writable()