import { Controller, Get } from '@nestjs/common';
import { NestShopService } from './nest-shop.service';

@Controller()
export class NestShopController {
  constructor(private readonly nestShopService: NestShopService) {}

  @Get()
  getHello(): string {
    return this.nestShopService.getHello();
  }
}
