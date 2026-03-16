import { loadNewsArticles } from '$lib/docs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const articles = await loadNewsArticles(locals.lang);
	return { articles };
};
