import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/catalogs/user/user.service';
import { AuthUserDto } from './dto/auth-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/catalogs/user/entities/user.entity';
import AuthUserResponse from './entities/auth-user-response';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  private async generateToken(userId: number): Promise<string> {
    const payload = { userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwtSecret'),
      expiresIn: this.configService.get('jwtExpire')
    });
  }

  public async login(authUserDto: AuthUserDto): Promise<AuthUserResponse> {
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

    const token = await this.generateToken(user.id);
    
    const authUserResponse = new AuthUserResponse();
    authUserResponse.id = user.id;
    authUserResponse.email = user.email;
    authUserResponse.emailVerified = user.emailVerified;

    return {...authUserResponse, token};
  }
  
}
