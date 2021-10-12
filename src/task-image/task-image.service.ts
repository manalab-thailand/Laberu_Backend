import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TaskSuccess,
  TaskSuccessDocument,
} from 'src/task-success/entities/task-success.schema';
import { CreateTaskImageManyDto } from './dto/create-task-image-many.dto';
import { GetTaskImageDto } from './dto/get-task-image.dto';
import { UpdateStatusTaskImageDto } from './dto/update-status-task-image.dto';
import { UpdateTaskImageDto } from './dto/update-task-image.dto';
import { TaskImage, TaskImageDocument } from './entities/task-image.schema';

@Injectable()
export class TaskImageService {
  constructor(
    @InjectModel(TaskImage.name)
    private readonly taskImageModel: Model<TaskImageDocument>,
    @InjectModel(TaskSuccess.name)
    private readonly taskSuccessModel: Model<TaskSuccessDocument>,
  ) {}

  async createTaskImageMany(
    payload: CreateTaskImageManyDto,
  ): Promise<TaskImage[]> {
    const { mapTaskSuccess } = payload;
    return await this.taskImageModel.insertMany(mapTaskSuccess);
  }

  async getTaskImage(payload: GetTaskImageDto): Promise<TaskImage> {
    const { project_id, user_id } = payload;
    return await this.taskImageModel
      .aggregate([
        {
          $lookup: {
            from: 'task_success',
            localField: 'shortcode',
            foreignField: 'shortcode',
            as: 'task_success',
          },
        },
        {
          $match: {
            status: 'waiting',
            process: 'doing',
            project_id: project_id,
            'task_success.user_id': { $ne: user_id },
          },
        },
        { $limit: 1 },
      ])
      .exec();
  }

  async updateStatusTaskImage(
    payload: UpdateStatusTaskImageDto,
  ): Promise<TaskImage> {
    const { status, task_id } = payload;

    return await this.taskImageModel
      .findByIdAndUpdate(task_id, { status }, { upsert: false })
      .exec();
  }
}
