import type { Handle } from '@sveltejs/kit';
import { setLocale, LOCALES, DEFAULT_LOCALE } from '$lib/i18n';
import type { Locale } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
  const cookieLang = event.cookies.get('lang') as Locale | undefined;
  const lang: Locale = LOCALES.includes(cookieLang as Locale) ? (cookieLang as Locale) : DEFAULT_LOCALE;

  setLocale(lang);
  event.locals.lang = lang;

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang),
  });
};