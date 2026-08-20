import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { USERS } from '@nippur-api-microservice/shared-contracts';

@Controller('users')
@USERS.UserServiceControllerMethods()
export class UsersController implements USERS.UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  async createUser(dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  async getById(dto: USERS.GetUserByIdRequest) {
    return await this.usersService.getById(dto.userId);
  }

  async getByEmail(dto: USERS.GetUserByEmailRequest) {
    return await this.usersService.getByEmailWithPassword(dto.email);
  }
}
