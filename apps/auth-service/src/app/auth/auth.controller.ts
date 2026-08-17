import { Controller } from '@nestjs/common';
import { AUTH } from '@nippur-api-microservice/shared-contracts';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@AUTH.AuthServiceControllerMethods()
export class AuthController implements AUTH.AuthServiceController {
  login(request: LoginDto) {
    return {
      token: `token to ${request.email}, ${request.password}`,
    };
  }
}
