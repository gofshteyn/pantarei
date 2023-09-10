import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/catalogs/user/user.module';
import { JwtStrategy } from 'src/auth/jwt-strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService],
  imports: [UserModule]
})
export class AuthModule {}
