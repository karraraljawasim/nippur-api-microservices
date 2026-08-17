import { Global, Module } from '@nestjs/common';
import { DATABASE_CONNECTION, databaseProvider } from './drizzle.provider';

@Global()
@Module({
  providers: [databaseProvider],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
