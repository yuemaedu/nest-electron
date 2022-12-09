import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header('apiKey');
    if (apiKey) {
      try {
        next();
      } catch (e) {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
