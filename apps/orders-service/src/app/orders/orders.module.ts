import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrderItemRepository } from './order-item.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';

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
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, OrderItemRepository],
})
export class OrdersModule {}
