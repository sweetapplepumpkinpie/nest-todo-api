import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '@entities/user.entity';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user): Promise<{ token: string }> {
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(user): Promise<Omit<User, 'password'>> {
    const { password, ...result } = await this.usersService.register(user);

    return result;
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }
}
