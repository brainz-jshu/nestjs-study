import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersModel } from './users.entity';
import { TagModel } from './tag.entity';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersModel, (user) => user.posts)
  author: UsersModel;

  @ManyToMany(() => TagModel, (tag) => tag.posts)
  tags: TagModel[];

  title: string;
}
