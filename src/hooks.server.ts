import type { Handle } from '@sveltejs/kit';
import { setLanguageTag, isAvailableLanguageTag } from '$lib/paraglide/runtime';


export const handle: Handle = async ({ event, resolve }) => {
	const cookieLang = event.cookies.get('lang') ?? 'en';
	const lang = isAvailableLanguageTag(cookieLang) ? cookieLang : 'en';

	// Store in locals so layout server can pass it to the client
	event.locals.lang = lang;

	// Set Paraglide language for this request (getter makes it request-scoped in SSR)
	setLanguageTag(() => event.locals.lang as 'en' | 'zh');

	return resolve(event, {
		// Inject lang attribute into <html>
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
