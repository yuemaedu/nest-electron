import { Injectable } from '@nestjs/common';

@Injectable()
export class NestBlogService {
  getHello(): string {
    return 'Hello World!';
  }
}
