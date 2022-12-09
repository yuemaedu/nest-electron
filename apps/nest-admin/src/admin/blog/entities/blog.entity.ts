import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;
}
