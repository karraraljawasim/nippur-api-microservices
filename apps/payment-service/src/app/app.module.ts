import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
