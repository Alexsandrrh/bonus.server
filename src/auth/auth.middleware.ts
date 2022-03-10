import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { ExpressRequestInterface } from '../types/expressRequest.interface';
import { UserService } from '../user/user.service';
import { ConfigServiceInterface } from '../types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(ConfigService)
    private readonly configService: ConfigServiceInterface,
  ) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(
        token,
        this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      ) as { sub: string };
      req.user = await this.userService.getUser(decode.sub);
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
