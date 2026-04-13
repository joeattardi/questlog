import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userName: varchar({ length: 255 }).notNull().unique(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    passwordHash: varchar({ length: 255 }).notNull()
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = Omit<User, 'id'>;
