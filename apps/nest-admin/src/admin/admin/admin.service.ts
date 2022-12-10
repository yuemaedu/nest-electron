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
    return this.adminRepository.insert(createAdminDto);
  }

  findAdminByName(name: string) {
    return this.adminRepository
      .createQueryBuilder('admin')
      .where('name = :name', { name })
      .addSelect('admin.password')
      .getOne();
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
    return this.adminRepository.findOne({ where: { id } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update(id, updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepository.delete(id);
  }
}
