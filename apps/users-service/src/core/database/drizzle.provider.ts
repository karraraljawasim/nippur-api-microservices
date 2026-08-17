import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as schema from './schema';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
const logger = new Logger('DatabaseProvider');

export const databaseProvider: Provider = {
  provide: DATABASE_CONNECTION,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const sql = neon(configService.get<string>('DATABASE_URL'));

    logger.log(`Users Database connection successfully.`);
    return drizzle({ client: sql, schema });
  },
};
