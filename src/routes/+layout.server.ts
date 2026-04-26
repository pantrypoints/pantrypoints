// import type { LayoutServerLoad } from './$types';

// export const prerender = true;

// export const load: LayoutServerLoad = async ({ locals }) => {
//     // 1. Get translations from your root /messages folder
//     const messageFiles = import.meta.glob('/messages/*.json');
//     const translations: Record<string, any> = {};

//     for (const path in messageFiles) {
//         const langCode = path.split('/').pop()?.replace('.json', '');
//         if (langCode) {
//             const mod = await messageFiles[path]() as { default: any };
//             translations[langCode] = mod.default;
//         }
//     }

//     // 2. Return everything in ONE return object
//     return { 
//         lang: locals.lang || 'en', 
//         translations 
//     };
// };



import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  return { lang: locals.lang };
};