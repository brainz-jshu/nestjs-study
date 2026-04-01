import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersModel } from '../entities/users.entity';

export const User = createParamDecorator(
  (data: keyof UsersModel | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as UsersModel;
    if (!user) {
      throw new InternalServerErrorException(
        'User not found in request context',
      );
    }
    return data ? user[data] : user;
  },
);
