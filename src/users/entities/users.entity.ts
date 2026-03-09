import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UsersModel {
  // @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn()
  // @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 저장횟수
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: number;
}
