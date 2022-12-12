import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './../../shared/guards/local-auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Request() req) {
    return await this.authService.register(req.body);
  }
}
