import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  NOTIFICATION_QUEUE,
  NOTIFICATION_RABBITMQ_CLIENT,
  PAYMENT_QUEUE,
  PAYMENT_RABBITMQ_CLIENT,
} from '@nippur-api-microservice/shared-contracts';
import { ConfigService } from '@nestjs/config';
import { PaymentController } from './payment.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PAYMENT_RABBITMQ_CLIENT,
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL')],
            queue: PAYMENT_QUEUE,
            queueOptions: { durable: true },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: NOTIFICATION_RABBITMQ_CLIENT,
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL')],
            queue: NOTIFICATION_QUEUE,
            queueOptions: { durable: true },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
