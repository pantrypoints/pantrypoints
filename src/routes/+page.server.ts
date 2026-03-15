import { fail } from '@sveltejs/kit';
import { getDb } from '$lib/db/index';
import { registrations } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	register: async ({ request, platform, cookies }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const organization = formData.get('organization') as string;
		const interest = formData.get('interest') as string;
		const lang = (cookies.get('lang') as 'en' | 'zh') ?? 'en';

		// Validation
		if (!name?.trim()) {
			return fail(400, { error: 'name_required', name, email, organization, interest });
		}
		if (!email?.trim() || !email.includes('@')) {
			return fail(400, { error: 'email_invalid', name, email, organization, interest });
		}

		const tursoUrl = platform?.env?.TURSO_URL;
		const tursoToken = platform?.env?.TURSO_AUTH_TOKEN;

		if (!tursoUrl) {
			// Dev mode fallback
			console.log('Dev mode: No Turso URL configured, skipping DB write');
			return { success: true };
		}

		try {
			const db = getDb(tursoUrl, tursoToken);

			// Check if email already exists
			const existing = await db
				.select()
				.from(registrations)
				.where(eq(registrations.email, email.toLowerCase().trim()))
				.limit(1);

			if (existing.length > 0) {
				return fail(400, { error: 'email_exists', name, email, organization, interest });
			}

			await db.insert(registrations).values({
				name: name.trim(),
				email: email.toLowerCase().trim(),
				organization: organization?.trim() || null,
				interest: interest?.trim() || null,
				lang,
				createdAt: new Date().toISOString()
			});

			return { success: true };
		} catch (err) {
			console.error('Registration error:', err);
			return fail(500, { error: 'server_error', name, email, organization, interest });
		}
	}
};
