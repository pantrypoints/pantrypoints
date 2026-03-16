import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { setLanguageTag, isAvailableLanguageTag } from '$lib/paraglide/runtime';
import { createI18n } from '@inlang/paraglide-sveltekit';
import * as runtime from '$lib/paraglide/runtime';

// const i18n = createI18n(runtime, { prefixDefaultLanguage: 'never' });

// const paraglideHandle: Handle = async ({ event, resolve }) => {
//   // Only apply URL-based lang routing for /news routes
//   if (event.url.pathname.startsWith('/news') || event.url.pathname.startsWith('/zh/news')) {
//     return i18n.handle()({ event, resolve });
//   }
//   return resolve(event);
// };

// const langHandle: Handle = async ({ event, resolve }) => {
//   const cookieLang = event.cookies.get('lang') ?? 'en';
//   const lang = isAvailableLanguageTag(cookieLang) ? cookieLang : 'en';

//   event.locals.lang = lang;
//   setLanguageTag(() => event.locals.lang as 'en' | 'zh');

//   return resolve(event, {
//     transformPageChunk: ({ html }) => html.replace('%lang%', lang)
//   });
// };

// export const handle: Handle = sequence(
//   paraglideHandle,
//   langHandle
// );




export const handle: Handle = async ({ event, resolve }) => {
  const cookieLang = event.cookies.get('lang') ?? 'en';
  const lang = isAvailableLanguageTag(cookieLang) ? cookieLang : 'en';

  event.locals.lang = lang;
  setLanguageTag(() => event.locals.lang as 'en' | 'zh');

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang)
  });
};



// import type { Handle } from '@sveltejs/kit';
// import { sequence } from '@sveltejs/kit/hooks';
// import { createI18n } from '@inlang/paraglide-sveltekit';
// import * as runtime from '$lib/paraglide/runtime';

// const i18n = createI18n(runtime, { prefixDefaultLanguage: 'never' });

// const langHandle: Handle = async ({ event, resolve }) => {
//   event.locals.lang = runtime.languageTag() as 'en' | 'zh';

//   return resolve(event, {
//     transformPageChunk: ({ html }) => html.replace('%lang%', event.locals.lang)
//   });
// };

// export const handle: Handle = sequence(
//   i18n.handle(),
//   langHandle
// );



// import type { Handle } from '@sveltejs/kit';
// import { setLanguageTag, isAvailableLanguageTag } from '$lib/paraglide/runtime';


// export const handle: Handle = async ({ event, resolve }) => {
// 	const cookieLang = event.cookies.get('lang') ?? 'en';
// 	const lang = isAvailableLanguageTag(cookieLang) ? cookieLang : 'en';

// 	// Store in locals so layout server can pass it to the client
// 	event.locals.lang = lang;

// 	// Set Paraglide language for this request (getter makes it request-scoped in SSR)
// 	setLanguageTag(() => event.locals.lang as 'en' | 'zh');

// 	return resolve(event, {
// 		// Inject lang attribute into <html>
// 		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
// 	});
// };


// Shallow people will not be able to make the connection.

// But we connect it with Planck's radiation law which fixes Rayleigh Jeans by adding h which represents the aetherspace as atomic space of the black body. 

// The marco version of the aetherspace is dark energy and was detected by Planck satellite as the blackbody curve of outerspace. 

// So material black body is connected to outserspace blackbody by the aetherspace (atomic space + dark energy). 

// If there were no dark energy, then outerspace would be totally cold at absolute zero which means it would be static and not expanding. But it is expanding and so outerspace is at 2.7 Kelvin. If it were 100 Kelvin then the expansion would be wilder. 