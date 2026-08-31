import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [AppConfigModule, DatabaseModule],
})
export class CoreModule {}
