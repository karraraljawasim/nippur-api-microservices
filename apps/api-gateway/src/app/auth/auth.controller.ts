import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
} from '@nippur-api-microservice/shared-contracts';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController implements OnModuleInit {
  private authService: AuthServiceClient;
  constructor(@Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit(){
    this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('login')
   login(@Body() dto: LoginDto) {
      return this.authService.login(dto)
  }
}
