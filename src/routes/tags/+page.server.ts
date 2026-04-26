import { getTagsWithArticles } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const lang = url.pathname.startsWith('/zh') ? 'zh' : 'en';
	const tags = await getTagsWithArticles(lang);
	
	return {
		lang,
		tags
	};
};

