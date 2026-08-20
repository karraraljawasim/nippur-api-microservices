import { SetMetadata } from '@nestjs/common';
import { USERS } from '@nippur-api-microservice/shared-contracts';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: USERS.UserRole[]) =>
  SetMetadata(ROLE_KEY, roles);
