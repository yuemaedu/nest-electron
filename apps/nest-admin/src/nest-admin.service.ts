import { Injectable } from '@nestjs/common';

@Injectable()
export class NestAdminService {
  getHello(): string {
    return 'Hello World!';
  }
}
