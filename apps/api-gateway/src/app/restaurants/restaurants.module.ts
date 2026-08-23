import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
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
  controllers: [RestaurantsController],
  providers: [],
})
export class RestaurantsModule {}
