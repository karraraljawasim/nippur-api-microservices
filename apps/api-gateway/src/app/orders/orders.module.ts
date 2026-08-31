import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS } from '@nippur-api-microservice/shared-contracts';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDERS.ORDER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: ORDERS.ORDER_PACKAGE_NAME,
          protoPath: ORDERS.ORDERS_PROTO_PATH,
          url: '0.0.0.0:5003',
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
