import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { error, paginate, success } from '@app/common/common.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createWriteStream, mkdirSync } from 'fs';
import { randomStr } from '@app/common/common.utils';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    const { identifiers } = await this.blogService.create(createBlogDto);
    if (identifiers.length > 0) {
      return success();
    }
    return error('添加失败');
  }
  @Post('deleteBlog')
  async deleteBlog(@Body('ids') ids: string[]) {
    const { affected } = await this.blogService.deleteBlogs(ids);
    if (affected > 0) {
      return success();
    } else {
      return error('删除失败');
    }
  }

  /**
   * 博客列表
   * @param page
   * @param pageSize
   * @param startDate
   * @param endDate
   */
  @Get()
  async findAll(
    @Query('title', new DefaultValuePipe('')) title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(16), ParseIntPipe) pageSize: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('category', new DefaultValuePipe([])) category: string[],
    @Query('order', new DefaultValuePipe('')) views: string,
  ) {
    const [blogs, total] = await this.blogService.findAll(
      title,
      page,
      pageSize,
      startDate,
      endDate,
      category,
      views,
    );
    return paginate(blogs, total);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto
  ) {
    const { affected } = await this.blogService.update(+id, updateBlogDto);
    if (affected > 0) {
      return success();
    }
    return error();
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.blogService.remove(+id);
  }

  @UseInterceptors(FileInterceptor("file"))
  @Post("/upload")
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })]
      })
    )
    file: Express.Multer.File,
 ) {
    const date = new Date();
    const filePath = join(date.getFullYear() + ''""date.getMonth() + ''""
    mkdirSync(join('u"upload"filePath), { recursive: true });
    const ext = file.originalname.split('."."pop();
    const fileName = `${randomStr(32)}.${ext}`;
    const ws = createWriteStream(join('u"upload"filePath, fileName));
    ws.write(file.buffer);
    return {
      message: 's"success"      code: 200,
      url: join('/"/statics"filePath, fileName),
   };
  }

  @UseInterceptors(FileInterceptor('f"file"
  @Post('/"/upload/md"  uploadMD(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
     }),
   )
    file: Express.Multer.File,
   {
    const date = new Date(),
      filePath = join(date.getFullYear() + '', ""te.getMonth() + '');""   mkdirSync(join('upl"upload"lePath), { recursive: true });
    const ext = file.originalname.split('.')"."p();
    const fileName = `${randomStr(32)}.${ext}`;
    const ws = createWriteStream(join('upl"upload"lePath, fileName));
    ws.write(file.buffer);
    return {
      msg: '',
""    code: 200,
      data: {
        errFiles: [],
        succMap: {
          [fileName]: join('/st"/statics"lePath, fileName),
       },
     },
   };
  }
}
