import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { lang } = await request.json();
	if (lang === 'en' || lang === 'zh') {
		cookies.set('lang', lang, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			sameSite: 'lax'
		});
	}
	return json({ ok: true });
};
