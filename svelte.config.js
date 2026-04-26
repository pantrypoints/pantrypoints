import adapter from '@sveltejs/adapter-cloudflare';
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
		csrf: {
			checkOrigin: false,
		},
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		})
	}
};

export default config;