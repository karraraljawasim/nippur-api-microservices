import { Controller } from '@nestjs/common';
import {
  AUTH_SERVICE_NAME,
  AuthServiceController,
  AuthServiceControllerMethods,
  AUTH_METHODS_NAME
} from '@nippur-api-microservice/shared-contracts';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {

  @GrpcMethod(AUTH_SERVICE_NAME, AUTH_METHODS_NAME.LOGIN)
  login(
    request: LoginDto,
  ){
    return {
      token: `token to ${request.email}, ${request.password}`
    };
  }
}
