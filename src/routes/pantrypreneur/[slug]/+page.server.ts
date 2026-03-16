import { error } from '@sveltejs/kit';
import { getApp } from '$lib/preneur';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ params }) => {
	console.log('Requested slug:', params.slug);

	const app = getApp(params.slug);
	if (!app) {
		throw error(404, { message: 'App not found' });
	}
	return { app };


};
