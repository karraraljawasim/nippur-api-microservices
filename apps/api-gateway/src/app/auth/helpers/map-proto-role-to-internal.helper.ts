import { USERS } from '@nippur-api-microservice/shared-contracts';
import { UserRole } from '../enum/user-role.enum';

export function mapProtoRoleToInternal(protoRole: USERS.UserRole): UserRole {
  switch (protoRole) {
    case USERS.UserRole.USER_ROLE_CUSTOMER:
      return UserRole.Customer;
    case USERS.UserRole.USER_ROLE_RESTAURANT_OWNER:
      return UserRole.RestaurantOwner;
    case USERS.UserRole.USER_ROLE_DRIVER:
      return UserRole.Driver;
    case USERS.UserRole.USER_ROLE_ADMIN:
      return UserRole.Admin;
    case USERS.UserRole.USER_ROLE_UNSPECIFIED:
    case USERS.UserRole.UNRECOGNIZED:
    default:
      return UserRole.Customer;
  }
}
