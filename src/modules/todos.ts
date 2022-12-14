import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosController } from '@todos/todos.controller';
import { TodosService } from '@todos/todos.service';
import { Todo } from '@entities/todo.entity';

@Module({
  providers: [TodosService],
  controllers: [TodosController],
  imports: [TypeOrmModule.forFeature([Todo])],
  exports: [TodosService],
})
export class TodosModule {}
