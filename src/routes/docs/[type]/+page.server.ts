import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { loadContent } from '$lib/content';
import type { ContentType } from '$lib/content';

const DOC_TYPES = [
  'circle', 'health', 'supereconomics', 'farm', 'match', 
  'world', 'preneur', 'educate', 'galaxiv', 'pantrylitics', 'predict'
] as const;

export const load: PageServerLoad = async ({ params }) => {
  const { type } = params;

  if (!DOC_TYPES.includes(type as any)) {
    throw error(404, `Unknown doc type: ${type}`);
  }

  const articles = await loadContent(type as ContentType, 'en');
  return { articles, type };
};