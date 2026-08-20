import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH } from '@nippur-api-microservice/shared-contracts';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
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
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [JwtAuthGuard, RoleGuard],
  exports: [PassportModule, JwtAuthGuard, RoleGuard],
})
export class AuthModule {}
