import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/db/index';
import { registrations } from '$lib/db/schema';
import { eq, inArray, desc } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { ADMIN_PWD } from '$env/static/private'; // Import from .env file

const ADMIN_SESSION_KEY = 'admin_session';

// Helper function to get admin password (works both locally and on Cloudflare)
function getAdminPassword(platformEnv: any): string {
	// In Cloudflare (online mode), use platform.env.ADMIN_PWD
	if (platformEnv?.ADMIN_PWD) {
		return platformEnv.ADMIN_PWD;
	}
	
	// In local development (offline mode), use ADMIN_PWD from .env
	if (ADMIN_PWD) {
		return ADMIN_PWD;
	}
	
	// Fallback for testing (should not be used in production)
	console.warn('No admin password found in environment variables! Using fallback.');
	return 'pantypoints';
}

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
		const adminPassword = getAdminPassword(platform?.env);

		if (password !== adminPassword) {
			return fail(401, { error: 'wrong_password' });
		}

		cookies.set(ADMIN_SESSION_KEY, 'authenticated', {
			path: '/',
			maxAge: 60 * 60 * 8, // 8 hours
			sameSite: 'lax',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
		});

		return { success: true };
	},

	logout: async ({ cookies }) => {
		cookies.delete(ADMIN_SESSION_KEY, { path: '/' });
		throw redirect(303, '/admin');
	},

	delete: async ({ request, cookies, platform }) => {
		// Auth check
		const session = cookies.get(ADMIN_SESSION_KEY);
		if (session !== 'authenticated') {
			return fail(403, { error: 'unauthorized' });
		}

		const formData = await request.formData();
		const ids = formData.getAll('ids').map(id => Number(id));

		if (ids.length === 0) {
			return fail(400, { error: 'no_ids_selected' });
		}

		const tursoUrl = platform?.env?.TURSO_URL;
		const tursoToken = platform?.env?.TURSO_AUTH_TOKEN;

		if (!tursoUrl || !tursoToken) {
			return fail(500, { error: 'database_not_configured' });
		}

		try {
			const db = getDb(tursoUrl, tursoToken);
			await db.delete(registrations).where(inArray(registrations.id, ids));
			return { success: true };
		} catch (err) {
			console.error('Delete error:', err);
			return fail(500, { error: 'delete_failed' });
		}
	}
};

