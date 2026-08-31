import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
