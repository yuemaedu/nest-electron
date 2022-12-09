import { Test, TestingModule } from '@nestjs/testing';
import { NestBlogController } from './nest-blog.controller';
import { NestBlogService } from './nest-blog.service';

describe('NestBlogController', () => {
  let nestBlogController: NestBlogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NestBlogController],
      providers: [NestBlogService],
    }).compile();

    nestBlogController = app.get<NestBlogController>(NestBlogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nestBlogController.getHello()).toBe('Hello World!');
    });
  });
});
