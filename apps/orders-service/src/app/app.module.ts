import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule, OrdersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
