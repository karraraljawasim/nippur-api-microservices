import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH } from '@nippur-api-microservice/shared-contracts';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH.AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH.AUTH_PACKAGE_NAME,
          protoPath: AUTH.AUTH_PROTO_PATH,
          url: '0.0.0.0:5000',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
