import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/auth.guard';

class AuthUserResponse {

  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsBoolean()
  emailVerified: boolean;

  @ApiProperty()
  @IsString()
  token: string
}

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({status: 200, type: AuthUserResponse})
  async login(@Body() authUserDto: AuthUserDto): Promise<AuthUserResponse> {

    const user = await this.authService.login(authUserDto);
    const token = await this.authService.generateToken(user.id);
    
    const authUserResponse = new AuthUserResponse();
    authUserResponse.id = user.id;
    authUserResponse.email = user.email;
    authUserResponse.emailVerified = user.emailVerified;

    return {...authUserResponse, token};
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  async test () {
    return true;
  }

}
