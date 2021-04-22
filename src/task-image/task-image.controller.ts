import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TaskImageService } from './task-image.service';
import { CreateTaskImageDto } from './dto/create-task-image.dto';
import { UpdateTaskImageDto } from './dto/update-task-image.dto';
import { UpdateImageDatumDto } from 'src/image-data/dto/update-image-datum.dto';

@Controller('task-image')
export class TaskImageController {
  constructor(private readonly taskImageService: TaskImageService) { }

  @Post('/create')
  async create(@Body() createTaskImageDto: CreateTaskImageDto) {
    return await this.taskImageService.create(createTaskImageDto);
  }

  @Get()
  async findAll() {
    return await this.taskImageService.findAll();
  }

  @Get('getCountTaskSuccess')
  async getCountTaskSuccess() {
    return await this.taskImageService.getCountTaskSuccess();
  }

  @Get('findImage/:user_id')
  async findNextImage(@Param('user_id') user_id: string) {
    return await this.taskImageService.findNextImage(user_id);
  }

  @Get('fineTaskSuccessWithId/:task_id')
  async fineTaskSuccessWithId(@Param('task_id') task_id: string) {
    return await this.taskImageService.fineTaskSuccessWithId(task_id)
  }

  @Get('findTaskSuccessInAllImages')
  async findTaskSuccessInImages() {
    return await this.taskImageService.findTaskSuccessInAnImages();
  }

  @Get('randomTaskSuccessInAnImages')
  async randomTaskSuccessInAnImages() {
    return await this.taskImageService.randomTaskSuccessInAnImages();
  }

  @Put('update_status/:_id')
  async updateStatus(@Param('_id') _id: string, @Body() updateTaskImageDto: UpdateTaskImageDto) {
    return await this.taskImageService.updateStatus(_id, updateTaskImageDto);
  }

  @Put('update_process/:_id')
  async updateProcess(@Param('_id') _id: string, @Body() updateTaskImageDto: UpdateTaskImageDto) {
    return await this.taskImageService.updateProcess(_id, updateTaskImageDto);
  }

  @Put('update_status_all')
  async updateStatusAll(@Body() updateTaskImageDto: UpdateTaskImageDto) {
    return await this.taskImageService.updateStatusAll(updateTaskImageDto);
  }

  @Put('reset_status_all')
  async resetStatusTask(@Body() updateImageDatumDto: UpdateImageDatumDto) {
    return await this.taskImageService.resetStatusTask(updateImageDatumDto);
  }

  @Delete('delete/:_id')
  async remove(@Param('_id') _id: string) {
    return await this.taskImageService.remove(_id);
  }

  @Delete('deleteAll')
  async removeAll() {
    return await this.taskImageService.removeAll();
  }
}
