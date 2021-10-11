import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTaskImageManyDto } from './dto/create-task-image-many.dto';
import { GetTaskImageDto } from './dto/get-task-image.dto';
import { TaskImage } from './entities/task-image.schema';
import { TaskImageService } from './task-image.service';

@Controller('task-image')
export class TaskImageController {
  constructor(private readonly taskImageService: TaskImageService) {}

  @Post('create-many')
  async createTaskImageMany(
    @Body() payload: CreateTaskImageManyDto,
  ): Promise<TaskImage[]> {
    return await this.taskImageService.createTaskImageMany(payload);
  }

  @Post('get-task-image')
  async getTaskImage(@Body() payload: GetTaskImageDto): Promise<TaskImage> {
    return await this.taskImageService.getTaskImage(payload);
  }
}
