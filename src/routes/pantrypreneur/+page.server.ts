import { apps } from '$lib/preneur';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
	return { apps };
};
