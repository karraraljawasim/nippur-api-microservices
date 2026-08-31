import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  FILTERS,
  ORDERS,
  PAYMENT_QUEUE,
} from '@nippur-api-microservice/shared-contracts';
import * as dotenv from 'dotenv';
import { resolve } from 'node:path';

dotenv.config({ path: resolve(process.cwd(), 'apps/orders-service/.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ORDERS.ORDER_PACKAGE_NAME,
      protoPath: ORDERS.ORDERS_PROTO_PATH,
      url: '0.0.0.0:5003',
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: PAYMENT_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new FILTERS.AllRpcExceptionsFilter());
  await app.startAllMicroservices();

  Logger.log(`🚀 Order is running on gRPC, and listing on RabbitMq`);
}

bootstrap();
