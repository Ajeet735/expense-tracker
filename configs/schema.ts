import {
  pgTable,
  text,
  timestamp,
  real,
  index,
} from 'drizzle-orm/pg-core';

// User table
export const users = pgTable('User', {
  id: text('id').notNull().primaryKey(),
  clerkUserId: text('clerkUserId').notNull().unique(),
  email: text('email').notNull().unique(),
  name: text('name'),
  imageUrl: text('imageUrl'),
  createdAt: timestamp('createdAt', { precision: 3, withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, withTimezone: true }).notNull(),
});

// Record table
export const records = pgTable('Record', {
  id: text('id').notNull().primaryKey(),
  text: text('text').notNull(),
  amount: real('amount').notNull(),
  category: text('category').notNull().default('Other'),
  date: timestamp('date', { precision: 3, withTimezone: true }).defaultNow().notNull(),
  userId: text('userId').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    userIdIdx: index('Record_userId_idx').on(table.userId),
  };
});
