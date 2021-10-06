import { Injectable } from '@nestjs/common';
import { CreateTaskSuccessDto } from './dto/create-task-success.dto';
import { UpdateTaskSuccessDto } from './dto/update-task-success.dto';

@Injectable()
export class TaskSuccessService {
  create(createTaskSuccessDto: CreateTaskSuccessDto) {
    return 'This action adds a new taskSuccess';
  }

  findAll() {
    return `This action returns all taskSuccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskSuccess`;
  }

  update(id: number, updateTaskSuccessDto: UpdateTaskSuccessDto) {
    return `This action updates a #${id} taskSuccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskSuccess`;
  }
}
