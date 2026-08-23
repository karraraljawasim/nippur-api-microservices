import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';

export const restaurants = pgTable('restaurants', {
  id: uuid('id')
    .$defaultFn(() => uuidv7())
    .primaryKey(),
  ownerId: uuid('owner_id').notNull(),
  name: varchar('name', { length: 150 }).notNull(),
  description: text('description').default(null),
  address: varchar('address', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).default(null),
  isOpen: boolean('is_open').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
