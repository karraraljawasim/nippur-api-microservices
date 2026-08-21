import { UserRole } from '../enum/user-role.enum';
import { USERS } from '@nippur-api-microservice/shared-contracts';

export function mapInternalRoleToProto(role: UserRole): USERS.UserRole {
  switch (role) {
    case UserRole.Customer:
      return USERS.UserRole.USER_ROLE_CUSTOMER;
    case UserRole.RestaurantOwner:
      return USERS.UserRole.USER_ROLE_RESTAURANT_OWNER;
    case UserRole.Driver:
      return USERS.UserRole.USER_ROLE_DRIVER;
    case UserRole.Admin:
      return USERS.UserRole.USER_ROLE_ADMIN;
    default:
      return USERS.UserRole.USER_ROLE_UNSPECIFIED;
  }
}
