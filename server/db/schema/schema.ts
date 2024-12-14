import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const doctors = sqliteTable('doctors', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name', { length: 255 }).notNull(),
	age: integer('age', { mode: 'number' }).notNull(),
	specialty: text('specialty', { length: 512 }),
	contact: text('contact', { length: 20 }),
	description: text('description', { length: 512 }),
	location: text('location', { mode: 'json' }),
	imageUrl: text('image_url', { mode: 'text' }),
});

export const ambulances = sqliteTable('ambulances', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	title: text('name', { length: 255 }).notNull(),
	description: text('description', { length: 512 }),
	location: text('location', { mode: 'json' }),
	imageUrl: text('image_url', { mode: 'text' }),
});
