import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersModel } from './users.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UsersModel, (user) => user.profile, {
    cascade: true,
  })
  @JoinColumn()
  user: UsersModel;

  @Column()
  profileImg: string;
}
