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



// import { loadContent } from '$lib/content';
// import { getAllTags, getTagCounts } from '$lib/content';
// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ params }) => {
// 	const lang = params.lang || 'en';
// 	const articles = await loadContent('docs', lang);
	
// 	const allTags = getAllTags(articles);
// 	const tagCounts = getTagCounts(articles);
	
// 	return {
// 		lang,
// 		tags: allTags.map((tag) => ({
// 			name: tag,
// 			count: tagCounts[tag] ?? 0
// 		}))
// 	};
// };

