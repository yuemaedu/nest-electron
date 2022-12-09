import { NestFactory } from '@nestjs/core';
import { NestBlogModule } from './nest-blog.module';

async function bootstrap() {
  const app = await NestFactory.create(NestBlogModule);
  await app.listen(3001);
}

bootstrap();
