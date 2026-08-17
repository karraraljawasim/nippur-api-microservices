import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS } from '@nippur-api-microservice/shared-contracts';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS.USERS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: USERS.USERS_PACKAGE_NAME,
          protoPath: USERS.USERS_PROTO_PATH,
          url: '0.0.0.0:5001',
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
