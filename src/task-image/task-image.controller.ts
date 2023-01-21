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
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ImageDataService } from 'src/image-data/image-data.service';
import { CreateTaskImageManyDto } from './dto/create-task-image-many.dto';
import { GetTaskImageDto } from './dto/get-task-image.dto';
import { UpdateStatusTaskImageDto } from './dto/update-status-task-image.dto';
import { TaskImage } from './entities/task-image.schema';
import { TaskImageStatus } from './interface/task-image.enum';
import { TaskImageService } from './task-image.service';

// @UseGuards(JwtAuthGuard)
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
  async getTaskImage(@Body() payload: GetTaskImageDto): Promise<any> {
    const getTaskImage = await this.taskImageService.getTaskImage(payload);

    if (!getTaskImage) {
      return {
        status: 400,
        message: 'task image not avaliable for you',
      };
    }

    const { _id } = getTaskImage[0];

    await this.taskImageService.updateStatusTaskImage({
      task_id: _id,
      status: TaskImageStatus.DOING,
    });

    return {
      status: 200,
      message: 'success',
      data: {
        task_image: getTaskImage[0],
        image_data: null,
      },
    };
  }

  @HttpCode(200)
  @Get('get-count-by-project')
  async getCountTaskImageByProject(@Query() payload: { project_id: string }) {
    return await this.taskImageService.getCountTaskImageByProjectId(payload);
  }

  @HttpCode(200)
  @Put('update-status-task')
  async updateStatusTask(
    @Body() payload: UpdateStatusTaskImageDto,
  ): Promise<any> {
    return await this.taskImageService.updateStatusTaskImage(payload);
  }
}
