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
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({
    operationId: 'createAdmin',
    summary: '新增管理员',
  })
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    console.log(createAdminDto, 'createAdminDto');
    const admin = await this.adminService.findAdminByName(createAdminDto.name);
    if (admin) {
      return error('管理员已经存在');
    }

    const saltOrRounds = 10;
    createAdminDto.password = await bcrypt.hash(
      createAdminDto.password,
      saltOrRounds,
    );
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

  @ApiOperation({
    operationId: 'login',
    summary: '登录',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const admin = await this.adminService.findAdminByName(loginDto.name);
    if (!admin) {
      return error('管理员不存在');
    }
    const isMatch = await bcrypt.compare(loginDto.password, admin.password);
    if (isMatch) {
      const token = this.jwtService.sign(
        { ...admin },
        { secret: '最爱白菜吖', expiresIn: '2d' },
      );

      return success({ token });
    }
    return error('密码错误');
  }
}
