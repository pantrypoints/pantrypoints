import { json } from '@sveltejs/kit';
import { getDb } from '$lib/db/index';
import { registrations } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	// 1. Handle CORS Preflight
	const origin = request.headers.get('origin');
	const allowedOrigins = [
		'lp.pantrypoints.com',
		'makati.pantrypoints.com',
		'manila.pantrypoints.com',
		'saigon.pantrypoints.com',
		'maharlika.superphysics.org',
		'superphysics.org',
		'www.superphysics.org',
		'www.unladsaka.com',
		'unladsaka.com',
		'localhost:1313',
		'localhost:5173',
		'www.yogahoasen.com',
		'yogahoasen.com',
	];

	// Check if origin is allowed
	if (origin) {
		const isAllowed = allowedOrigins.some(allowed => origin.includes(allowed));
		if (!isAllowed) {
			return new Response('Not allowed', { status: 403 });
		}
	}

	try {
		const data = await request.formData();
		const email = data.get('email')?.toString().toLowerCase().trim();
		const name = data.get('name')?.toString().trim();
		const source = data.get('source')?.toString().trim();
		
		// Mapping Maharlika fields to your Drizzle schema
		const subject = data.get('subject')?.toString();
		const message = data.get('message')?.toString();

		if (!email || !name) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const db = getDb(platform?.env?.TURSO_URL, platform?.env?.TURSO_AUTH_TOKEN);

		// 2. Check for existing email
		const existing = await db.select().from(registrations).where(eq(registrations.email, email)).limit(1);

		if (existing.length > 0) {
			return json({ error: 'Already registered' }, { status: 409 });
		}

		// 3. Insert into DB
		await db.insert(registrations).values({
			name,
			email,
			subj: subject || 'External Registration',
			msg: message || null,
			lang: data.get('lang')?.toString() || 'en',
			createdAt: new Date().toISOString(),
			source: source || null,
			country: data.get('country')?.toString() || null,
			city: data.get('city')?.toString() || null
		});

		return json({ success: true }, {
			headers: {
				'Access-Control-Allow-Origin': origin || '*',
				'Access-Control-Allow-Methods': 'POST'
			}
		});

	} catch (err) {
		console.error(err);
		return json({ error: 'Server error' }, { status: 500 });
	}
};

// Handle OPTIONS request for CORS preflight
export const OPTIONS: RequestHandler = async ({ request }) => {
	const origin = request.headers.get('origin');
	
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Origin': origin || '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		}
	});
};

