import { join } from 'path';

export const AUTH_PROTO_PATH = join(
  __dirname,
  'libs/shared-contracts/protos/auth.proto',
);

export const AUTH_METHODS_NAME = {
  LOGIN: 'login',
} as const;
