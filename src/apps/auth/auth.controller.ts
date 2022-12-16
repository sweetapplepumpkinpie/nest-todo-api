import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '@guards/local-auth';
import { JwtAuthGuard } from '@guards/jwt-auth';
import { AuthService } from './auth.service';
import { User } from '@decorators/user';

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verify(@User() user) {
    return user;
  }

  @Post('register')
  async register(@Request() req) {
    return await this.authService.register(req.body);
  }
}
