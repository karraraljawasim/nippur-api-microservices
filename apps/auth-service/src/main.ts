import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH, FILTERS } from '@nippur-api-microservice/shared-contracts';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTH.AUTH_PACKAGE_NAME,
        protoPath: AUTH.AUTH_PROTO_PATH,
        url: '0.0.0.0:5000',
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
  Logger.log(`🚀 Auth application is running on gRPC`);
}

bootstrap();
