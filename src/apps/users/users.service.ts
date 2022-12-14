import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '@entities/user.entity';
import { BaseService } from '@base/base.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService extends BaseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email;
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      this._throwAlreadyExistException('Email already exists');
    } else {
      const user = new User();
      const hash = bcrypt.hashSync(createUserDto.password, 10);

      Object.assign(user, { ...createUserDto, password: hash });
      return this.userRepository.save(user);
    }
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
