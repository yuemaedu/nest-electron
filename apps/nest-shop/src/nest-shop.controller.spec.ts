import { Test, TestingModule } from '@nestjs/testing';
import { NestShopController } from './nest-shop.controller';
import { NestShopService } from './nest-shop.service';

describe('NestShopController', () => {
  let nestShopController: NestShopController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NestShopController],
      providers: [NestShopService],
    }).compile();

    nestShopController = app.get<NestShopController>(NestShopController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nestShopController.getHello()).toBe('Hello World!');
    });
  });
});
