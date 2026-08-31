import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
