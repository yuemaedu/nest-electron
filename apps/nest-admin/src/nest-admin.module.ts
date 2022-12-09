import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NestAdminController } from './nest-admin.controller';
import { NestAdminService } from './nest-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './admin/blog/blog.module';
import * as path from 'path';
import * as os from 'os';
import { AuthMiddleware } from '@app/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.resolve(
        os.homedir(),
        'nest-electron',
        'nest-admin.sqlite3',
      ),
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    BlogModule,
  ],
  controllers: [NestAdminController],
  providers: [NestAdminService],
})
export class NestAdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        '/admin/admin/login',
        '/admin/admin/login/captcha',
        // '/admin/product/upload/img',
        // '/admin/product/upload/img/file',
        // '/admin/product/upload/img/list',
        // '/admin/product/upload/video',
      )
      .forRoutes('/admin/*');
  }
}
