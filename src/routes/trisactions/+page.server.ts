import { apps } from '$lib/apps';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { apps };
};
