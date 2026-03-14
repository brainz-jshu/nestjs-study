import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from './entities/users.entity';
import { ProfileModel } from './entities/profile.entity';
import { PostModel } from './entities/post.entity';
import { TagModel } from './entities/tag.entity';

@Controller()
export class UsersController {
  constructor(
    @InjectRepository(UsersModel)
    private readonly userRepository: Repository<UsersModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
        posts: true,
      },
    });
  }

  @Post('users')
  async createUser() {
    const user = this.userRepository.create({
      title: '1',
    });
    const newUser = await this.userRepository.save(user);
    const profile = this.profileRepository.create({
      user: newUser,
      profileImg: 'profile.jpg',
    });
    await this.profileRepository.save(profile);
    return newUser;
  }

  @Patch('users/:id')
  async updateUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: { id: Number(id) },
    });
    if (!user) {
      throw new Error('User not found');
    }
    user.title = 'Updated Title';
    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }

  @Post('posts')
  async createUserAndPosts() {
    const user = this.userRepository.create({
      title: 'User with Posts',
    });
    const newUser = await this.userRepository.save(user);

    const post1 = this.postRepository.create({
      author: newUser,
      title: 'Post 1',
    });
    await this.postRepository.save(post1);

    const post2 = this.postRepository.create({
      author: newUser,
      title: 'Post 2',
    });
    await this.postRepository.save(post2);

    await this.tagRepository.save({
      name: 'Tag 1',
      posts: [post1, post2],
    });

    await this.tagRepository.save({
      name: 'Tag 2',
      posts: [post1],
    });

    return newUser;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        author: true,
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
