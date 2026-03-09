import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersModel } from './entities/users.entity';
import { StudentModel, TeacherModel } from './entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersModel, TeacherModel, StudentModel])],
  controllers: [UsersController],
})
export class UsersModule {}
