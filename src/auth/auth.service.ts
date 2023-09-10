import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/catalogs/user/user.service';
import { AuthUserDto } from './dto/auth-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/catalogs/user/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async generateToken(user: number) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwtSecret'),
      expiresIn: this.configService.get('jwtExpire')
    });
  }

  async login(authUserDto: AuthUserDto): Promise<User> {
    const user = await this.userService.findUserByEmail(authUserDto.email);
    if (!user) throw new BadRequestException({
      code: '400',
      message: 'Пользователь не зарегистрирован'
    });
    const validatePassword = await bcrypt.compare(authUserDto.password, user.passwordHash);
    if (!validatePassword) throw new BadRequestException({
      code: '400',
      message: 'Введен некорректный пароль'
    });

    return user;
  }
  
}
