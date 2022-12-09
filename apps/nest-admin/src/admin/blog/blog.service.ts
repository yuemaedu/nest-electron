import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    return this.blogRepository.insert(createBlogDto);
  }

  deleteBlogs(ids: string[]) {
    return this.blogRepository.delete(ids);
  }

  findAll(
    title = '',
    page = 1,
    pageSize = 15,
    startDate = '',
    endDate = '',
    category = [],
    order = 'ascend',
  ) {
    const res = this.blogRepository
      .createQueryBuilder()
      .where(
        new Brackets((q) => {
          if (title) {
            q.where('title like :title', { title: `%${title}%` });
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
      .andWhere(
        new Brackets((q) => {
          if (category.length > 0) {
            q.where('category in (:...category)', { category });
          }
        }),
      );
    if (order) {
      if (order === 'ascend') {
        res.orderBy('views', 'ASC');
      } else {
        res.orderBy('views', 'DESC');
      }
    } else {
      res.orderBy('id', 'DESC');
    }
    return res.getManyAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.blogRepository.update(id, updateBlogDto);
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
