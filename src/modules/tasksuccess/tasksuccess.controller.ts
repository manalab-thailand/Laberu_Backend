import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TasksuccessService } from './tasksuccess.service';
import { CreateTasksuccessDto } from './dto/create-tasksuccess.dto';
import { UpdateTasksuccessDto } from './dto/update-tasksuccess.dto';

@Controller('tasksuccess')
export class TasksuccessController {
  constructor(private readonly tasksuccessService: TasksuccessService) {}

  @Post()
  create(@Body() createTasksuccessDto: CreateTasksuccessDto) {
    return this.tasksuccessService.create(createTasksuccessDto);
  }

  @Get()
  findAll() {
    return this.tasksuccessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksuccessService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTasksuccessDto: UpdateTasksuccessDto) {
    return this.tasksuccessService.update(+id, updateTasksuccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksuccessService.remove(+id);
  }
}
