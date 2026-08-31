import { Global, Module } from '@nestjs/common';
import { DATABASE_CONNECTION, databaseProviders } from './drizzle.providers';

@Global()
@Module({
  providers: [...databaseProviders],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
