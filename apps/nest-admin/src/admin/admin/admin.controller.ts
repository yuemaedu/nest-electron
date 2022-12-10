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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { error, paginate, success } from '@app/common';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.findAdminByName(createAdminDto.name);
    if (admin) {
      return error('管理员已经存在');
    }
    const { generatedMaps } = await this.adminService.create(createAdminDto);
    if (generatedMaps.length > 0) {
      return success();
    }
    return error('添加失败');
  }

  @Get()
  async findAll(
    @Query('name', new DefaultValuePipe('')) name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(16), ParseIntPipe) pageSize: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const [admins, total] = await this.adminService.findAll(
      name,
      page,
      pageSize,
      startDate,
      endDate,
    );
    return paginate(admins, total);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    let admin = await this.adminService.findOne(id);
    if (!admin) {
      return error('管理员不存在');
    }
    admin = await this.adminService.findOne(+id);
    return success(admin);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const admin = await this.adminService.findOne(id);
    if (!admin) {
      return error('管理员不存在');
    }
    const { affected } = await this.adminService.remove(+id);
    if (affected > 0) {
      return success();
    }
    return error();
  }
}
