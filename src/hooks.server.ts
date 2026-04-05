import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { setLanguageTag, isAvailableLanguageTag } from '$lib/paraglide/runtime';
import { createI18n } from '@inlang/paraglide-sveltekit';
import * as runtime from '$lib/paraglide/runtime';



export const handle: Handle = async ({ event, resolve }) => {
  const cookieLang = event.cookies.get('lang') ?? 'en';

  console.log('COOKIE LANG:', cookieLang); // ← add this
  const lang = isAvailableLanguageTag(cookieLang) ? cookieLang : 'en';
  console.log('RESOLVED LANG:', lang); // ← and this


  event.locals.lang = lang;
  setLanguageTag(() => event.locals.lang as 'en' | 'zh' | 'fr' | 'es' | 'vi' );

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang)
  });
};
