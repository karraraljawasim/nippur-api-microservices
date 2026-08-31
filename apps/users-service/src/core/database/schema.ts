import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';
import { USERS } from '@nippur-api-microservice/shared-contracts';

export const userRoleEnum = pgEnum('user_role', [
  USERS.InternalUserRole.Customer,
  USERS.InternalUserRole.Admin,
  USERS.InternalUserRole.Driver,
  USERS.InternalUserRole.RestaurantOwner,
]);

export const users = pgTable('users', {
  id: uuid('id')
    .$defaultFn(() => uuidv7())
    .primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRoleEnum('role').notNull().default(USERS.InternalUserRole.Customer),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
