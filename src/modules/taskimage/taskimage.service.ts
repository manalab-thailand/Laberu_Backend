import { TaskImageObjectService } from '@laberu/task-image-object';
import { TaskSuccessObjectService } from '@laberu/task-success-object';
import { Injectable } from '@nestjs/common';
import { CreateTaskimageDto } from './dto/create-taskimage.dto';
import { UpdateTaskimageDto } from './dto/update-taskimage.dto';

@Injectable()
export class TaskimageService {

  constructor(
    private readonly taskImageObjectService: TaskImageObjectService,
  ) { }

  create(createTaskimageDto: CreateTaskimageDto) {
    return 'This action adds a new taskimage';
  }

  findAll() {
    return `This action returns all taskimage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskimage`;
  }

  update(id: number, updateTaskimageDto: UpdateTaskimageDto) {
    return `This action updates a #${id} taskimage`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskimage`;
  }
}
