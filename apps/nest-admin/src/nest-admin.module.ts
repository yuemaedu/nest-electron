import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NestAdminController } from './nest-admin.controller';
import { NestAdminService } from './nest-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './admin/blog/blog.module';
import * as path from 'path';
import * as os from 'os';
import { UserModule } from './admin/user/user.module';
import { PostModule } from './admin/post/post.module';
import { AdminModule } from './admin/admin/admin.module';

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
    UserModule,
    PostModule,
    AdminModule,
  ],
  controllers: [NestAdminController],
  providers: [NestAdminService],
})
export class NestAdminModule {}
