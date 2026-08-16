/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  AllRpcExceptionsFilter,
  AUTH_PACKAGE_NAME,
  AUTH_PROTO_PATH,
} from '@nippur-api-microservice/shared-contracts';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options:{
      package: AUTH_PACKAGE_NAME,
      protoPath:AUTH_PROTO_PATH
    }
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllRpcExceptionsFilter())

  await app.listen()
  Logger.log(
    `🚀 Application is running on gRPC`,
  );
}

bootstrap();
