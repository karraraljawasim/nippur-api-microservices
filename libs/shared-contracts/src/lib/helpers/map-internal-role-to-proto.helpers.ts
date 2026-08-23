import { InternalUserRole } from '../users';
import { UserRole } from '../generated/users';

export function mapInternalUserRoleToProto(role: InternalUserRole): UserRole {
  switch (role) {
    case InternalUserRole.Customer:
      return UserRole.USER_ROLE_CUSTOMER;
    case InternalUserRole.RestaurantOwner:
      return UserRole.USER_ROLE_RESTAURANT_OWNER;
    case InternalUserRole.Driver:
      return UserRole.USER_ROLE_DRIVER;
    case InternalUserRole.Admin:
      return UserRole.USER_ROLE_ADMIN;
    default:
      return UserRole.USER_ROLE_UNSPECIFIED;
  }
}
