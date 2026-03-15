import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const registrations = sqliteTable('registrations', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	organization: text('organization'),
	interest: text('interest'),
	lang: text('lang').notNull().default('en'),
	createdAt: text('created_at').notNull()
});

export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
