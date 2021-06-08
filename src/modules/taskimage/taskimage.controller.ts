import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TaskimageService } from './taskimage.service';
import { CreateTaskimageDto } from './dto/create-taskimage.dto';
import { UpdateTaskimageDto } from './dto/update-taskimage.dto';

@Controller('taskimage')
export class TaskimageController {
  constructor(private readonly taskimageService: TaskimageService) {}

  @Post()
  create(@Body() createTaskimageDto: CreateTaskimageDto) {
    return this.taskimageService.create(createTaskimageDto);
  }

  @Get()
  findAll() {
    return this.taskimageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskimageService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskimageDto: UpdateTaskimageDto) {
    return this.taskimageService.update(+id, updateTaskimageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskimageService.remove(+id);
  }
}
