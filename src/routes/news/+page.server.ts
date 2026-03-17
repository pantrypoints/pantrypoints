import { loadContent, type ContentArticle } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lang = params.lang || 'en';
	const articles = await loadContent('news', lang);
	
	return {
		articles,
		lang
	};
};

