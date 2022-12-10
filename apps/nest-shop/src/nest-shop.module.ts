import { Module } from '@nestjs/common';
import { NestShopController } from './nest-shop.controller';
import { NestShopService } from './nest-shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as os from 'os';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.resolve(
        os.homedir(),
        'nest-electron',
        'nest-shop',
        'nest-shop.sqlite3',
      ),
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [NestShopController],
  providers: [NestShopService],
})
export class NestShopModule {}
