import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import { resolve } from 'node:path';

dotenv.config({
  path: resolve(process.cwd(), 'apps/users-service/.env'),
});

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

export default defineConfig({
  schema: './apps/users-service/src/core/database/schema.ts',
  out: './apps/users-service/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
