import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';

import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from '@guards/jwt-auth';
import { User } from '@decorators/user';
import { User as UserEntity } from '@entities/user.entity';

@Controller('api/todos')
@ApiTags('Todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post('/')
  public async create(@User() user: UserEntity, @Body() todo: CreateTodoDto) {
    return await this.todosService.create(todo, user);
  }

  @Get('/')
  public async getAll(@User() user: UserEntity) {
    return await this.todosService.getAll(user);
  }

  @Get('/:id')
  public async get(@Param() { id }: { id: string }, @User() user: UserEntity) {
    return await this.todosService.get(+id, user);
  }

  @Put('/:id')
  public async update(
    @Param() { id }: { id: string },
    @Body() todo: UpdateTodoDto,
    @User() user: UserEntity,
  ) {
    return await this.todosService.update(+id, todo, user);
  }

  @Delete('/:id')
  public async delete(
    @Param() { id }: { id: string },
    @User() user: UserEntity,
    @Response() res: ExpressResponse,
  ) {
    await this.todosService.delete(+id, user);
    res.sendStatus(204);
  }
}
