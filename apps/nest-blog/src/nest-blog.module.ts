import { Module } from '@nestjs/common';
import { NestBlogController } from './nest-blog.controller';
import { NestBlogService } from './nest-blog.service';

@Module({
  imports: [],
  controllers: [NestBlogController],
  providers: [NestBlogService],
})
export class NestBlogModule {}
