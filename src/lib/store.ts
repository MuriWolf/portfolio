import { writable, type Writable } from 'svelte/store';

export const openAsideMobile = writable(false);
export const languageSelected: Writable<'en' | 'pt'> = writable('en'); // adicionar mais idiomas casa necessário
export const textContent: any = writable();
export const projectName = writable('');