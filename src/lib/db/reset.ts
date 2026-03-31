import { getDb } from './index';
import { sql } from 'drizzle-orm';

// Ensure your .env has DATABASE_URL (the libsql:// link) and DATABASE_AUTH_TOKEN
const dbUrl = process.env.TURSO_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl) {
	console.error('❌ TURSO_URL is missing from your environment variables.');
	process.exit(1);
}

async function reset() {
	console.log(`⏳ Resetting Turso database at: ${dbUrl}...`);
	const db = getDb(dbUrl, authToken);

	try {
		// 1. Drop the existing tables (add any other tables you have here)
		console.log('🗑️  Dropping tables...');
		await db.run(sql`DROP TABLE IF EXISTS registrations;`);
		
		// 2. Clear Drizzle's internal migration history table (optional but cleaner)
		await db.run(sql`DROP TABLE IF EXISTS __drizzle_migrations;`);

		console.log('✅ Database wiped!');
	} catch (error) {
		console.error('❌ Reset failed:', error);
		process.exit(1);
	}
}

reset();