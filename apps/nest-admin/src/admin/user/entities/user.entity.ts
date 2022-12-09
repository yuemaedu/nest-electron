import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  avatar: string;
  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];
}
