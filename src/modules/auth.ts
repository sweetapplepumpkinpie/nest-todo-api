import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from '@strategies/local';
import { JwtStrategy } from '@strategies/jwt';
import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { UsersModule } from './users';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET || 'secret',
      signOptions: { expiresIn: process.env.EXPIRES_IN || 360000 },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
