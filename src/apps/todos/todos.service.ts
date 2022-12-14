import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from '@entities/todo.entity';
import { User } from '@entities/user.entity';
import { BaseService } from '@base/base.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService extends BaseService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {
    super();
  }

  public async get(id: number, user: User): Promise<Todo> {
    try {
      return await this.todoRepository.findOneByOrFail({ id, user });
    } catch (error: any) {
      this._throwNotFoundException(error.message);
    }
  }

  public async create(todo: CreateTodoDto, user: User): Promise<Todo> {
    return await this.todoRepository.save({ ...todo, user });
  }

  public async getAll(user: User): Promise<Todo[]> {
    return await this.todoRepository.find({ where: { user } });
  }

  public async update(
    id: number,
    todo: UpdateTodoDto,
    user: User,
  ): Promise<any> {
    try {
      await this.todoRepository.update({ id, user }, todo);
      return await this.todoRepository.findOneBy({ id });
    } catch (error: any) {
      this._throwUnprocessableEntityException(error.message);
    }
  }

  public async delete(id: number, user: User): Promise<any> {
    try {
      return await this.todoRepository.delete({ id, user });
    } catch (error: any) {
      this._throwUnprocessableEntityException(error.message);
    }
  }
}
