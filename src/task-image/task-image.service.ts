import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskImageManyDto } from './dto/create-task-image-many.dto';
import { GetTaskImageDto } from './dto/get-task-image.dto';
import { UpdateTaskImageDto } from './dto/update-task-image.dto';
import { TaskImage, TaskImageDocument } from './entities/task-image.schema';

@Injectable()
export class TaskImageService {
  constructor(
    @InjectModel(TaskImage.name)
    private readonly taskImageModel: Model<TaskImageDocument>,
  ) {}

  async createTaskImageMany(
    payload: CreateTaskImageManyDto,
  ): Promise<TaskImage[]> {
    const { mapTaskSuccess } = payload;
    return await this.taskImageModel.insertMany(mapTaskSuccess);
  }

  async getTaskImage(payload: GetTaskImageDto): Promise<TaskImage> {
    const { project_id, user_id } = payload;
    return await this.taskImageModel.findOne().exec();

    //* 1) get task image where status = 'waiting' and process = 'doing'
    //* 2) update task image status = 'doing'
  }

  async updateTaskImage(payload: UpdateTaskImageDto): Promise<TaskImage> {
    const { task_id } = payload;
    return await this.taskImageModel.findByIdAndUpdate();

    //* After Create Task Success
    //* 1) check count image of task
    //* 2) if image success < label count
    //* 2.1) update task status = 'waiting'
    //* 3) else
    //* 3.1) update task status = 'success' and task process = 'success'
  }
}
