import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// lang is set in hooks.server.ts from cookie
	return { lang: locals.lang };
};
