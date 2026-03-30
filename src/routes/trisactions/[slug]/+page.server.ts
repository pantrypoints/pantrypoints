import { error } from '@sveltejs/kit';
import { getItemFromCollection } from '$lib/registry';

export const load = async ({ params }) => {
    const app = getItemFromCollection('trisactions', params.slug);
    if (!app) throw error(404, `App ${params.slug} not found`);
    return { app };
};

