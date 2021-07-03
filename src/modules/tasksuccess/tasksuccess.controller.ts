import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CreateTaskSuccess } from './dto/create-task-success.dto';
import { FindCountTaskSuccessByUser } from './dto/find-count-by-user.dto';
import { FindCountSuccessByProjectId } from './dto/find-count-success-by-project.dto';
import { FindCountTaskSuccessByShortcode } from './dto/find-count-success-by-shortcode.dto';
import { ITasksuccessController } from './interface/tasksuccess-interface.controller';
import { TasksuccessService } from './tasksuccess.service';
@Controller('tasksuccess')
export class TasksuccessController implements ITasksuccessController {
  constructor(private readonly tasksuccessService: TasksuccessService) { }

  @Post('create')
  async create(@Body() payload: CreateTaskSuccess): Promise<any> {
    return await this.tasksuccessService.createTaskSuccessHandler(payload);
  }

  @Get('findCountTaskSuccessByShortcode')
  async findCountTaskSuccessByShortcode(@Query() payload: FindCountTaskSuccessByShortcode): Promise<any> {
    return await this.tasksuccessService.findCountTaskSuccessByShortcodeHandler(payload);
  }

  @Get('findCountTaskSuccessByUser')
  async findCountTaskSuccessByUser(@Query() payload: FindCountTaskSuccessByUser): Promise<any> {
    return await this.tasksuccessService.findCountTaskSuccessHandler(payload);
  }

  @Get('findCountTaskSuccessByProject')
  async findCountTaskSuccessByProject(@Query() payload: FindCountSuccessByProjectId): Promise<any> {
    return await this.tasksuccessService.findCountTaskSuccessByProjectHandler(payload);
  }

}
