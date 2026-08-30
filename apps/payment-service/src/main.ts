import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ORDER_QUEUE } from '@nippur-api-microservice/shared-contracts';
import * as dotenv from 'dotenv';
import { resolve } from 'node:path';

dotenv.config({ path: resolve(process.cwd(), 'apps/payment-service/.env') });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: ORDER_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
  Logger.log(`🚀 Payment is listening on rabbitMq`);
}

bootstrap();
