// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Platform {
			env: {
				TURSO_URL: string;
				TURSO_AUTH_TOKEN: string;
				ADMIN_PASSWORD: string;
			};
			context: {
				waitUntil(promise: Promise<unknown>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
		interface Locals {
			lang: 'en' | 'zh';
		}
	}
}

export {};
