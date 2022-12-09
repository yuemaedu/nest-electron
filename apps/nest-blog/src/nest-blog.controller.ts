import { Controller, Get } from '@nestjs/common';
import { NestBlogService } from './nest-blog.service';

@Controller()
export class NestBlogController {
  constructor(private readonly nestBlogService: NestBlogService) {}

  @Get()
  getHello(): string {
    return this.nestBlogService.getHello();
  }
}
