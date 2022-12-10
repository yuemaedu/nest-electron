import { Injectable } from '@nestjs/common';

@Injectable()
export class NestShopService {
  getHello(): string {
    return 'Hello World!';
  }
}
