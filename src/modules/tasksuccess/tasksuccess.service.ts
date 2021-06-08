import { Injectable } from '@nestjs/common';
import { CreateTasksuccessDto } from './dto/create-tasksuccess.dto';
import { UpdateTasksuccessDto } from './dto/update-tasksuccess.dto';

@Injectable()
export class TasksuccessService {
  create(createTasksuccessDto: CreateTasksuccessDto) {
    return 'This action adds a new tasksuccess';
  }

  findAll() {
    return `This action returns all tasksuccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tasksuccess`;
  }

  update(id: number, updateTasksuccessDto: UpdateTasksuccessDto) {
    return `This action updates a #${id} tasksuccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} tasksuccess`;
  }
}
