import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  banner: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ type: 'text' })
  content: string;
  @CreateDateColumn()
  createdAt: Date;
  @Column({ default: 0 })
  views: number;
  @Column()
  category: string;
  @ManyToOne(() => User, (user) => user.blogs)
  user: User;
}
