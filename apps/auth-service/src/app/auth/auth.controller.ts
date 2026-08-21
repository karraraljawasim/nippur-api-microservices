import { Controller } from '@nestjs/common';
import { AUTH } from '@nippur-api-microservice/shared-contracts';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
@AUTH.AuthServiceControllerMethods()
export class AuthController implements AUTH.AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async register(dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }

  async login(dto: LoginUserDto) {
    return await this.authService.login(dto);
  }
}
