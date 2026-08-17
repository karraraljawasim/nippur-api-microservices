import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { USERS } from '@nippur-api-microservice/shared-contracts';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController implements OnModuleInit {
  private userService: USERS.UserServiceClient;
  constructor(@Inject(USERS.USERS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<USERS.UserServiceClient>(
      USERS.USER_SERVICE_NAME,
    );
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}
