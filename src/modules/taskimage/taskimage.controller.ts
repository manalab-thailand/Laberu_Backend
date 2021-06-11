import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CreateTaskImageManyHandler } from './dto/create-many.dto';
import { CreateTaskImageHandler } from './dto/create-task-image.dto';
import { FindCountTaskImage } from './dto/find-count.dto';
import { QueryImage } from './dto/query-image.dto';
import { ResetTaskImage } from './dto/reset-task-image.dto';
import { TaskImageResponse } from './dto/task-image-response.dto';
import { UpdateProcessTaskImage, UpdateStatusTaskImage } from './dto/update-task-image.dto';
import { ITaskimageController } from './interface/taskimage-interface.controller';
import { TaskimageService } from './taskimage.service';

@Controller('taskimage')
export class TaskimageController implements ITaskimageController {
  constructor(
    private readonly taskimageService: TaskimageService
  ) { }

  @Post('create')
  async create(@Body() payload: CreateTaskImageHandler): Promise<any> {
    return await this.taskimageService.createTaskImageHandler(payload);
  }

  @Post('createInsertMany')
  async createInsertMany(@Body() payload: CreateTaskImageManyHandler): Promise<any> {
    return await this.taskimageService.createTaskImageManyHandler(payload);
  }

  @Get('findCountImage')
  async findCountImage(@Query() payload: FindCountTaskImage): Promise<any> {
    return await this.taskimageService.findCountImageHandler(payload);
  }

  @Post('queryImage')
  async queryImage(@Body() payload: QueryImage): Promise<TaskImageResponse> {
    return await this.taskimageService.QueryTaskImageHandler(payload);
  }

  @Put('updateStatusImage')
  async updateStatusImage(@Body() payload: UpdateStatusTaskImage): Promise<any> {
    return await this.taskimageService.UpdateStatusHandler(payload);
  }

  @Put('updateProcessImage')
  async updateProcessImage(@Body() payload: UpdateProcessTaskImage): Promise<any> {
    return await this.taskimageService.UpdateProcessHandler(payload);
  }

  @Put('ResetTaskImage')
  async resetTaskImage(@Body() payload: ResetTaskImage): Promise<any> {
    return await this.taskimageService.ResetTaskImageHandler(payload);
  }

}
