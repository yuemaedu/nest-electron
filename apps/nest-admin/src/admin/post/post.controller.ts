import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { error, paginate, success } from '@app/common';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(16), ParseIntPipe) pageSize: number,
  ) {
    const [posts, total] = await this.postService.findAll(page, pageSize);
    return paginate(posts, total);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.findOne(id);
    if (!post) {
      return error('');
    }
    const { affected } = await this.postService.remove(+id);
    if (affected > 0) {
      return success();
    }
    return error('删除失败');
  }
}
