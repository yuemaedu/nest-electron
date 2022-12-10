import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    name: 'name',
    description: '用户名',
    example: '最爱白菜吖',
  })
  name: string;

  @ApiProperty({
    name: 'password',
    description: '密码',
    example: '12345678',
  })
  password: string;
}
