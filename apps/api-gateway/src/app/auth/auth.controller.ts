import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { AUTH } from '@nippur-api-microservice/shared-contracts';
import { ClientGrpc } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { firstValueFrom } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private authService: AUTH.AuthServiceClient;
  constructor(@Inject(AUTH.AUTH_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AUTH.AuthServiceClient>(
      AUTH.AUTH_SERVICE_NAME,
    );
  }

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return await firstValueFrom(this.authService.register(dto));
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return await firstValueFrom(this.authService.login(dto));
  }
}
