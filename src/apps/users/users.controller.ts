import { JwtAuthGuard } from './../../shared/guards/jwt-auth';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Request() req) {
    return this.userService.register(req.body);
  }
}
