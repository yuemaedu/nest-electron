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
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('nest-admin--nest+typeorm')
    .setDescription('nest-admin')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('nest-admin', app, document);

  await app.listen(3002, () => {
    console.log('http://localhost:3002');
  });
}

bootstrap();
