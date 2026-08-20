import { Controller } from '@nestjs/common';
import { AUTH } from '@nippur-api-microservice/shared-contracts';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@AUTH.AuthServiceControllerMethods()
export class AuthController implements AUTH.AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async register(dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }
}
