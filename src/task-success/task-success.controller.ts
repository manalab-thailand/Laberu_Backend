import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TaskSuccessService } from './task-success.service';
import { CreateTaskSuccessDto } from './dto/create-task-success.dto';
import { UpdateTaskSuccessDto } from './dto/update-task-success.dto';

@Controller('task-success')
export class TaskSuccessController {
  constructor(private readonly taskSuccessService: TaskSuccessService) {}

  @Post()
  create(@Body() createTaskSuccessDto: CreateTaskSuccessDto) {
    return this.taskSuccessService.create(createTaskSuccessDto);
  }

  @Get()
  findAll() {
    return this.taskSuccessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskSuccessService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskSuccessDto: UpdateTaskSuccessDto) {
    return this.taskSuccessService.update(+id, updateTaskSuccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskSuccessService.remove(+id);
  }
}
