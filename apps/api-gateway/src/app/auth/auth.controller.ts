import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { AUTH } from '@nippur-api-microservice/shared-contracts';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private authService: AUTH.AuthServiceClient;
  constructor(@Inject(AUTH.AUTH_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AUTH.AuthServiceClient>(
      AUTH.AUTH_SERVICE_NAME,
    );
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
