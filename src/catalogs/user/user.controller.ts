import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/auth.guard';

class UserResponse {

  @IsNumber()
  id: number;

  @IsString()
  email: string;

  @IsBoolean()
  emailVerified: boolean;
}

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({status: 200, type: UserResponse, description: 'Пользователь создан'})
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.userService.create(createUserDto);
    const userResponse = new UserResponse();
    userResponse.id = user.id;
    userResponse.email = user.email;
    userResponse.emailVerified = user.emailVerified;
    return userResponse;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    const user = await this.userService.findOne(+id);
    const userResponse = new UserResponse();
    userResponse.id = user.id;
    userResponse.email = user.email;
    userResponse.emailVerified = user.emailVerified;
    return userResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() request) {
    console.log(request.user);
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
