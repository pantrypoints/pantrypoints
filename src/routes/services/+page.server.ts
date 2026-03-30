import { getRegistry } from '$lib/registry';
export const load = () => ({ items: getRegistry('services') });


// import { apps } from '$lib/services';
// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async () => {
// 	return { apps };
// };
