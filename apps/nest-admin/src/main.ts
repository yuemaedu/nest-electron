import { NestFactory } from '@nestjs/core';
import { NestAdminModule } from './nest-admin.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as os from 'os';
import { mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(NestAdminModule);
  const assetPath = path.resolve(os.homedir(), 'nest-electron', 'upload');
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

  await app.listen(3002);
}

bootstrap();
