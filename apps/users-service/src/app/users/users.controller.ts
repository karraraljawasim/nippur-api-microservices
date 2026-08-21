import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { USERS } from '@nippur-api-microservice/shared-contracts';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { GetUserByEmailDto } from './dto/get-user-by-email.dto';

@Controller('users')
@USERS.UserServiceControllerMethods()
export class UsersController implements USERS.UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  async createUser(dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  async getById(dto: GetUserByIdDto) {
    return await this.usersService.getById(dto.userId);
  }

  async getByEmailWithPassword(dto: GetUserByEmailDto) {
    return await this.usersService.getByEmailWithPassword(dto.email);
  }
}
