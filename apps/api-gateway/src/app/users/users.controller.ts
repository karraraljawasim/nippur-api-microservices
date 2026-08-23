import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { HELPERS, USERS } from '@nippur-api-microservice/shared-contracts';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../auth/enum/user-role.enum';
import { firstValueFrom } from 'rxjs';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UpdateCurrentUserDto } from './dto/update-current-user.dto';

@Controller('users')
export class UsersController implements OnModuleInit {
  private userService: USERS.UserServiceClient;
  constructor(@Inject(USERS.USERS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<USERS.UserServiceClient>(
      USERS.USER_SERVICE_NAME,
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@GetUser('sub') sub: string) {
    const user = await firstValueFrom(
      this.userService.getById({ userId: sub }),
    );
    return { ...user, role: HELPERS.mapProtoUserRoleToInternal(user.role) };
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMyProfile(
    @GetUser('sub') sub: string,
    @Body() dto: UpdateCurrentUserDto,
  ) {
    const user = await firstValueFrom(
      this.userService.updateCurrentUser({ userId: sub, ...dto }),
    );
    return { ...user, role: HELPERS.mapProtoUserRoleToInternal(user.role) };
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.Admin)
  async getById(@Param() dto: GetUserByIdDto) {
    const user = await firstValueFrom(this.userService.getById(dto));
    return { ...user, role: HELPERS.mapProtoUserRoleToInternal(user.role) };
  }
}
