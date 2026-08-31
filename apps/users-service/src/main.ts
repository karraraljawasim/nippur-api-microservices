import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FILTERS, USERS } from '@nippur-api-microservice/shared-contracts';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: USERS.USERS_PACKAGE_NAME,
        protoPath: USERS.USERS_PROTO_PATH,
        url: '0.0.0.0:5001',
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new FILTERS.AllRpcExceptionsFilter());
  await app.listen();
  Logger.log(`🚀 Users application is running on gRPC`);
}

bootstrap();
