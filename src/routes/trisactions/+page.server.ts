// import { apps } from '$lib/apps';
// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async () => {
// 	return { apps };
// };


import { getRegistry } from '$lib/registry';
export const load = () => ({ items: getRegistry('trisactions') });