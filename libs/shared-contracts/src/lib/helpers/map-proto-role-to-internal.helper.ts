import { InternalUserRole } from '../users';
import { UserRole } from '../generated/users';

export function mapProtoUserRoleToInternal(
  protoRole: UserRole,
): InternalUserRole {
  switch (protoRole) {
    case UserRole.USER_ROLE_CUSTOMER:
      return InternalUserRole.Customer;
    case UserRole.USER_ROLE_RESTAURANT_OWNER:
      return InternalUserRole.RestaurantOwner;
    case UserRole.USER_ROLE_DRIVER:
      return InternalUserRole.Driver;
    case UserRole.USER_ROLE_ADMIN:
      return InternalUserRole.Admin;
    case UserRole.USER_ROLE_UNSPECIFIED:
    case UserRole.UNRECOGNIZED:
    default:
      return InternalUserRole.Customer;
  }
}
