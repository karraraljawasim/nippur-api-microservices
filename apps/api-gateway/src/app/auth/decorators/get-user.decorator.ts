import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { USERS } from '@nippur-api-microservice/shared-contracts';
import { Request } from 'express';

type RequestWithUser = Request & {
  user: Omit<USERS.User, 'passwordHash'>;
};
export const GetUser = createParamDecorator(
  (
    data: keyof Omit<USERS.User, 'passwordHash'> | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
