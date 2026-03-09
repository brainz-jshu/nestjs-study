import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(UsersModel)
    private readonly userRepository: Repository<UsersModel>,
  ) {}

  @Post()
  getUsers() {
    return this.userRepository.find();
  }

  @Get()
  async createUser() {
    const user = this.userRepository.create({
      title: '1',
    });
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  @Patch(':id')
  async updateUser(@Param() id: string) {
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
}
