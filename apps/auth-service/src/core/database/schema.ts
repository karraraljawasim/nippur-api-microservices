import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';

export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid('id')
    .$defaultFn(() => uuidv7())
    .primaryKey(),
  userId: uuid('user_id').notNull(),
  tokenHash: text('token_hash').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  revoked: boolean('revoked').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
