import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Todos from 'src/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todos)
    private readonly todo_repository: Repository<Todos>,
  ) {}
  create = async (createTodoDto: CreateTodoDto) => {
    const createTodo = await this.todo_repository.create(createTodoDto);
    this.todo_repository.save(createTodo);
    return createTodo;
  };

  findAll = async () => {
    return await this.todo_repository.find();
  };

  findOne = async (id: number) => {
    return await this.todo_repository.findOne({ where: { id } });
  };

  update = async (id: number, updateTodoDto: UpdateTodoDto) => {
    const updateTodo = await this.todo_repository.update(
      { id },
      { ...updateTodoDto },
    );
    if (updateTodo.affected === 1) {
      return `todo updated successfully`;
    } else {
      return `todo updated failed`;
    }
  };

  remove = async (id: number) => {
    await this.todo_repository.remove({ id } as Todos);
    return 'deleted successfully';
  };
}
