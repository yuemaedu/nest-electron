import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll(name = '', page = 1, pageSize = 15, startDate = '', endDate = '') {
    return this.adminRepository
      .createQueryBuilder()
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .where(
        new Brackets((q) => {
          if (name) {
            q.where('name like :name', { name: `%${name}%` });
          }
        }),
      )
      .andWhere(
        new Brackets((q) => {
          if (startDate && endDate) {
            q.andWhere('createdAt between :startDate and :endDate', {
              startDate,
              endDate,
            });
          }
        }),
      )
      .orderBy('id', 'DESC')
      .getManyAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
