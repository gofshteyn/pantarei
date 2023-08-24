import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

const users = [{
  id: 1,
  displayName: 'Leonid Gofshtein',
  objectName: {
    ru: "Леонид Гофштэйн",
    en: 'Leonid Gofshtein'
  },
  deleted: false
}
];

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {

    const existUser = await this.findUserByEmail(createUserDto.email);
    if (existUser) new BadRequestException('Пользователь уже существует');

    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    await this.userRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
      localizationId: createUserDto.localizationId
    });
    return createUserDto;
  }

  async findUserByEmail(email) {
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
