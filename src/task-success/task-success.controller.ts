import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskSuccessService } from './task-success.service';
import { CreateTaskSuccessDto } from './dto/create-task-success.dto';
import { UpdateTaskSuccessDto } from './dto/update-task-success.dto';

@Controller('task-success')
export class TaskSuccessController {
  constructor(private readonly taskSuccessService: TaskSuccessService) { }

  @Post('/create')
  async create(@Body() createTaskSuccessDto: CreateTaskSuccessDto) {
    return await this.taskSuccessService.create(createTaskSuccessDto);
  }

  @Get()
  async findAll() {
    return await this.taskSuccessService.findAll();
  }

  @Get('findByShortcode/:shortcode')
  async findByShortcode(@Param('shortcode') shortcode: String) {
    return await this.taskSuccessService.findByShortcode(shortcode);
  }

  @Get('findCountByShortcode/:shortcode')
  async findCountByShortcode(@Param('shortcode') shortcode: String) {
    return await this.taskSuccessService.findCountByShortcode(shortcode);
  }

  @Get('findByUser/:user_id/:accept')
  async findByUser(
    @Param('user_id') user_id: String,
    @Param('accept') accept: Boolean,
  ) {
    return await this.taskSuccessService.findCountTaskByUser(user_id, accept);
  }

  @Get('findImageByUser/:user_id')
  async findImageByUser(@Param('user_id') user_id: String) {
    return await this.taskSuccessService.findImageByUser(user_id);
  }

  @Get('randomImageByUser/:user_id')
  async randomImageByUser(@Param('user_id') user_id: String) {
    return await this.taskSuccessService.randomImageByUser(user_id);
  }

  @Delete('delete/:_id')
  async remove(@Param('_id') _id: String) {
    return await this.taskSuccessService.remove(_id);
  }

  @Delete('deleteAll')
  async removeAll() {
    return await this.taskSuccessService.removeAll();
  }
}
