import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	alias: {
		"@/*": "./path/to/lib/*",
	  },  
	kit: {
		adapter: adapter()
	}
};

export default config;
