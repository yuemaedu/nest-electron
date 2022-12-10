import { NestFactory } from '@nestjs/core';
import { NestShopModule } from './nest-shop.module';
import * as path from 'path';
import * as os from 'os';
import { mkdirSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(NestShopModule);
  const assetPath = path.resolve(
    os.homedir(),
    'nest-electron',
    'nest-shop',
    'upload',
  );
  mkdirSync(assetPath, { recursive: true });
  app.useStaticAssets(assetPath, {
    prefix: '/statics',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('nest-admin', app, document);
  await app.listen(3003, () => {
    console.log('http://localhost:3003');
  });
}
bootstrap();
