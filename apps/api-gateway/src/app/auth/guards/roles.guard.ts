import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';
import { UserRole } from '../enum/user-role.enum';
import { JwtPayload } from '../types/auth.types';

type RequestWithUser = Request & {
  user: JwtPayload;
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
    if (!requiredRole.includes(user.role as UserRole)) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
