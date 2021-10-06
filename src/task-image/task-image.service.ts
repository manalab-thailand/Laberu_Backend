import { Injectable } from '@nestjs/common';
import { CreateTaskImageDto } from './dto/create-task-image.dto';
import { UpdateTaskImageDto } from './dto/update-task-image.dto';

@Injectable()
export class TaskImageService {
  create(createTaskImageDto: CreateTaskImageDto) {
    return 'This action adds a new taskImage';
  }

  findAll() {
    return `This action returns all taskImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskImage`;
  }

  update(id: number, updateTaskImageDto: UpdateTaskImageDto) {
    return `This action updates a #${id} taskImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskImage`;
  }
}
