import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FILTERS, ORDERS } from '@nippur-api-microservice/shared-contracts';

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
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'orders-queue',
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

  Logger.log(`🚀 Application is listing on RabbitMq`);
}

bootstrap();
