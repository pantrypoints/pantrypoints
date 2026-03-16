import { error } from '@sveltejs/kit';
import { getApp } from '$lib/services';
import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ params }) => {
// 	const app = getApp(params.slug);
// 	if (!app) {
// 		throw error(404, { message: 'App not found' });
// 	}
// 	return { app };
// };


export const load: PageServerLoad = async ({ params }) => {
    console.log('Requested slug:', params.slug); // Debugging
    const app = getApp(params.slug);
    
    if (!app) {
        console.log('App not found for slug:', params.slug);
        throw error(404, { message: `App "${params.slug}" not found` });
    }
    return { app };
};

