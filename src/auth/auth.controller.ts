import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import UserResponse from 'src/catalogs/user/entities/user-response.entity';
import AuthUserResponse from './entities/auth-user-response';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({status: 200, type: AuthUserResponse})
  async login(@Body() authUserDto: AuthUserDto): Promise<AuthUserResponse> {
    return await this.authService.login(authUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  async test () {
    return true;
  }

}
