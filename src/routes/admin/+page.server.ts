import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/db/index';
import { registrations } from '$lib/db/schema';
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

const ADMIN_SESSION_KEY = 'admin_session';

export const load: PageServerLoad = async ({ cookies, platform }) => {
	const session = cookies.get(ADMIN_SESSION_KEY);
	const isAuthenticated = session === 'authenticated';

	if (!isAuthenticated) {
		return { isAuthenticated: false, users: [], stats: null };
	}

	const tursoUrl = platform?.env?.TURSO_URL;
	const tursoToken = platform?.env?.TURSO_AUTH_TOKEN;

	if (!tursoUrl) {
		return {
			isAuthenticated: true,
			users: [
				{
					id: 1,
					name: 'Demo User',
					email: 'demo@example.com',
					organization: 'Demo Org',
					interest: 'Testing the platform',
					lang: 'en',
					createdAt: new Date().toISOString()
				}
			],
			stats: { total: 1, recent: 1 }
		};
	}

	try {
		const db = getDb(tursoUrl, tursoToken);
		const users = await db
			.select()
			.from(registrations)
			.orderBy(desc(registrations.createdAt))
			.limit(500);

		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
		const recentCount = users.filter((u) => new Date(u.createdAt) >= thirtyDaysAgo).length;

		return {
			isAuthenticated: true,
			users,
			stats: { total: users.length, recent: recentCount }
		};
	} catch (err) {
		console.error('Admin load error:', err);
		return { isAuthenticated: true, users: [], stats: { total: 0, recent: 0 } };
	}
};


export const actions: Actions = {
	login: async ({ request, cookies, platform }) => {
		const formData = await request.formData();
		const password = formData.get('password') as string;
		const adminPassword = platform?.env?.ADMIN_PASSWORD ?? 'pantypoints';

		if (password !== adminPassword) {
			return fail(401, { error: 'wrong_password' });
		}

		cookies.set(ADMIN_SESSION_KEY, 'authenticated', {
			path: '/',
			maxAge: 60 * 60 * 8,
			sameSite: 'lax',
			httpOnly: true
		});

		return { success: true };
	},

	logout: async ({ cookies }) => {
		cookies.delete(ADMIN_SESSION_KEY, { path: '/' });
		redirect(303, '/admin');
	}
};
