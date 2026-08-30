import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrderItemRepository } from './order-item.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  NOTIFICATION_QUEUE,
  NOTIFICATION_RABBITMQ_CLIENT,
  ORDER_QUEUE,
  ORDER_RABBITMQ_CLIENT,
  RESTAURANTS,
} from '@nippur-api-microservice/shared-contracts';
import { ConfigService } from '@nestjs/config';
import { OrdersEventController } from './orders-event.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RESTAURANTS.RESTAURANTS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: RESTAURANTS.RESTAURANTS_PACKAGE_NAME,
          protoPath: RESTAURANTS.RESTAURANTS_PROTO_PATH,
          url: '0.0.0.0:5002',
        },
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: ORDER_RABBITMQ_CLIENT,
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL')],
            queue: ORDER_QUEUE,
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
  controllers: [OrdersController, OrdersEventController],
  providers: [OrdersService, OrdersRepository, OrderItemRepository],
})
export class OrdersModule {}
