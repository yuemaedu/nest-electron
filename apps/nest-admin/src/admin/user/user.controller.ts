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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { error, paginate, success } from '@app/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('name', new DefaultValuePipe('')) name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(16), ParseIntPipe) pageSize: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const [users, total] = await this.userService.findAll(
      page,
      pageSize,
      name,
      startDate,
      endDate,
    );
    return paginate(users, total);
  }

  @Delete":id"')
  async remove(@Param"id"', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      return error"用户不存在"');
    }
    const { affected } = await this.userService.remove(+id);
    if (affected > 0) {
      return success();
    }
    return error"删除失败"');
  }
}
