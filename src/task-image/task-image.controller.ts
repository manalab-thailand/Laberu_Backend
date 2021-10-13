import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ImageDataService } from 'src/image-data/image-data.service';
import { CreateTaskImageManyDto } from './dto/create-task-image-many.dto';
import { GetTaskImageDto } from './dto/get-task-image.dto';
import { TaskImage } from './entities/task-image.schema';
import { TaskImageService } from './task-image.service';

@UseGuards(JwtStrategy)
@Controller('task-image')
export class TaskImageController {
  constructor(
    private readonly taskImageService: TaskImageService,
    private readonly imageDataService: ImageDataService,
  ) {}

  @HttpCode(200)
  @Post('create-many')
  async createTaskImageMany(
    @Body() payload: CreateTaskImageManyDto,
  ): Promise<TaskImage[]> {
    return await this.taskImageService.createTaskImageMany(payload);
  }

  @HttpCode(200)
  @Post('get-task-image')
  async getTaskImage(@Body() payload: GetTaskImageDto): Promise<TaskImage> {
    return await this.taskImageService.getTaskImage(payload);
  }
}
