import adapter from '@sveltejs/adapter-cloudflare';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svelte.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.svelte.md'],
			smartypants: true
		})
	],
	kit: {
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		})
	}
};

export default config;

