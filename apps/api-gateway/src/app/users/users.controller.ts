import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { USERS } from '@nippur-api-microservice/shared-contracts';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../auth/enum/user-role.enum';

@Controller('users')
export class UsersController implements OnModuleInit {
  private userService: USERS.UserServiceClient;
  constructor(@Inject(USERS.USERS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<USERS.UserServiceClient>(
      USERS.USER_SERVICE_NAME,
    );
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.Admin)
  findById(@Param() dto: GetUserByIdDto) {
    return this.userService.getById(dto);
  }
}
