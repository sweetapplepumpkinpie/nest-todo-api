import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email;
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
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
