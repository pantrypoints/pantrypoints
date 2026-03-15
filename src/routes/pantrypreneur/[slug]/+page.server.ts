import { error } from '@sveltejs/kit';
import { getApp } from '$lib/apps';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const app = getApp(params.slug);
	if (!app) {
		throw error(404, { message: 'App not found' });
	}
	return { app };
};
