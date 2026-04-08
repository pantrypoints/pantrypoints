import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';
import { loadContentBySlug } from '$lib/content';
import type { ContentType } from '$lib/content';

const DOC_TYPES = [
  'circle', 'health', 'supereconomics', 'farm', 'match',
  'world', 'preneur', 'educate', 'galaxiv', 'pantrylitics', 'predict'
] as const;

export const load: PageServerLoad = async ({ params }) => {
  const { type, slug } = params;
  const lang = 'en'; // swap for paraglide lang detection if needed

  if (!DOC_TYPES.includes(type as any)) {
    throw error(404, `Unknown doc type: ${type}`);
  }

  const modules = import.meta.glob('/src/content/**/*.md');
  const path = Object.keys(modules).find(p =>
    p.includes(`/content/${lang}/docs/${type}/${slug}.md`) ||
    p.includes(`/content/en/docs/${type}/${slug}.md`)
  );

  if (!path) throw error(404, 'Article not found');

  const mod = await modules[path]() as any;
  const rendered = render(mod.default, { props: {} });

  return {
    article: {
      slug,
      type,
      title: mod.metadata?.title ?? slug,
      description: mod.metadata?.description ?? '',
      date: mod.metadata?.date ?? '',
      image: mod.metadata?.image ?? '',
      icon: mod.metadata?.icon ?? '',
      author: mod.metadata?.writer?.name ?? mod.metadata?.author ?? 'Pantrypoints Team',
      tags: mod.metadata?.tags ?? [],
      lang,
    },
    content: rendered.body
  };
};