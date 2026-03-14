import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersModel } from './entities/users.entity';
import { StudentModel, TeacherModel } from './entities/person.entity';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { ProfileModel } from './entities/profile.entity';
import { PostModel } from './entities/post.entity';
import { TagModel } from './entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersModel,
      StudentModel,
      TeacherModel,
      PostsModel,
      ProfileModel,
      PostModel,
      TagModel,
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
