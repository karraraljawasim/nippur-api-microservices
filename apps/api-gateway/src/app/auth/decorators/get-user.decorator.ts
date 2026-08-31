import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../types/auth.types';

type RequestWithUser = Request & {
  user: JwtPayload;
};
export const GetUser = createParamDecorator(
  (data: 'sub' | 'role' | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
