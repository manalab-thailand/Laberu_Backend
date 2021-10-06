import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TaskImageService } from './task-image.service';
import { CreateTaskImageDto } from './dto/create-task-image.dto';
import { UpdateTaskImageDto } from './dto/update-task-image.dto';

@Controller('task-image')
export class TaskImageController {
  constructor(private readonly taskImageService: TaskImageService) {}

  @Post()
  create(@Body() createTaskImageDto: CreateTaskImageDto) {
    return this.taskImageService.create(createTaskImageDto);
  }

  @Get()
  findAll() {
    return this.taskImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskImageService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskImageDto: UpdateTaskImageDto) {
    return this.taskImageService.update(+id, updateTaskImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskImageService.remove(+id);
  }
}
