import { Controller } from '@nestjs/common';
import { USERS } from '@nippur-api-microservice/shared-contracts';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@USERS.UserServiceControllerMethods()
export class UsersController implements USERS.UserServiceController {
  createUser(request: CreateUserDto) {
    return {
      id: request.id,
      name: request.name,
    };
  }
}
