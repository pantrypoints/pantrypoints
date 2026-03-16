import { apps } from '$lib/services';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { apps };
};
