import { USERS } from '@nippur-api-microservice/shared-contracts';

export type JwtPayload = {
  sub: string;
  role: USERS.InternalUserRole;
};

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
