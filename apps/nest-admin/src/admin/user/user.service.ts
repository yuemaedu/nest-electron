import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(page = 1, pageSize = 15, name = '', startDate = '', endDate = '') {
    return this.userRepository
      .createQueryBuilder()
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
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .getManyAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
