import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';


export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	const lang = params.lang || 'en';
	
	try {
		const modules = import.meta.glob('/src/content/**/*.md');
		
		const path = Object.keys(modules).find(p => 
			p.includes(`/${lang}/docs/${slug}.md`) || 
			p.includes(`/en/docs/${slug}.md`)
		);
		
		if (!path) throw error(404, 'Article not found');
		
		const loader = modules[path];
		const mod = await loader() as any;
		
		// SVELTE 5 WAY: Use the render function on the default export (the component)
		// We pass an empty object as the second argument for props
		const rendered = render(mod.default, { props: {} });
		
		return {
			article: {
				slug,
				title: mod.metadata.title,
				description: mod.metadata.description || '',
				date: mod.metadata.date,
				// Fallback for your specific 'writer' metadata structure
				author: mod.metadata.writer?.name || mod.metadata.author || 'Pantrypoints Team',
				tags: mod.metadata.tags || [],
			},
			content: rendered.body // 'body' contains the actual HTML string
		};
	} catch (e) {
		console.error(`Failed to load article ${slug}:`, e);
		throw error(404, 'Article not found');
	}
};

