import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { User } from 'src/users/schemas/user.schema';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request: Request & { user: User } = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
