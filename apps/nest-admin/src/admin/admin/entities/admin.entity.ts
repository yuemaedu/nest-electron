import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    name: 'name',
    description: '用户名',
    example: '最爱白菜吖',
  })
  @Column()
  name: string;

  @ApiProperty({
    name: 'password',
    description: '密码',
    example: '12345678',
    required: false,
  })
  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
