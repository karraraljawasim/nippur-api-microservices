import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';
import { USERS } from '@nippur-api-microservice/shared-contracts';
import { UserRole } from '../enum/user-role.enum';
import { mapProtoRoleToInternal } from '../helpers/map-proto-role-to-internal.helper';

type RequestWithUser = Request & {
  user: Omit<USERS.User, 'passwordHash'>;
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRole || requiredRole.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    if (!requiredRole.includes(mapProtoRoleToInternal(user.role))) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
