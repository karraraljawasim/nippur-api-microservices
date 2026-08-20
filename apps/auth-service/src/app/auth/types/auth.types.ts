import { UserRole } from '../enum/user-role.enum';

export type JwtPayload = {
  sub: string;
  role: UserRole;
};

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
