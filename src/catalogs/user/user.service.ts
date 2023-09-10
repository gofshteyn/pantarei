import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

const users = [{
  id: 1,
  displayName: 'Ivan Ivanov',
  objectName: {
    ru: "Иван Иванов",
    en: 'Ivan Ivanov'
  },
  deleted: false
}
];

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {

    const user = await this.findUserByEmail(createUserDto.email);
    if (user) throw new BadRequestException({
      code: '400',
      message: 'Пользователь уже существует'
    });

    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    
    return await this.userRepository.create({
      email: createUserDto.email,
      passwordHash: createUserDto.password
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
        deleted: false
      }
    });
  }

  findAll() {
    return users;
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
        deleted: false
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
