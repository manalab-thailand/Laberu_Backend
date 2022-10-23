import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { CreateTaskImageManyDto } from './dto/create-task-image-many.dto';
import { GetTaskImageByShortcode } from './dto/get-task-image-by-shortcode.dto';
import { GetTaskImageDto } from './dto/get-task-image.dto';
import { UpdateStatusTaskImageDto } from './dto/update-status-task-image.dto';
import { TaskImage, TaskImageDocument } from './entities/task-image.schema';
import { TaskImageProcess, TaskImageStatus } from './interface/task-image.enum';
import * as moment from 'moment';
import {
  TaskSuccess,
  TaskSuccessDocument,
} from 'src/task-success/entities/task-success.schema';
import * as resultJSON from '../../captions.json';
import { PaymentStatus } from 'src/task-success/interface/task-success.enum';

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

  async getCountTaskImageByProjectId(payload: { project_id: string }) {
    const total = await this.taskImageModel
      .countDocuments({
        project_id: payload.project_id,
      })
      .exec();

    const success = await this.taskImageModel
      .countDocuments({
        project_id: payload.project_id,
        process: TaskImageProcess.SUCCESS,
      })
      .exec();

    return {
      total,
      success,
    };
  }

  async getTaskImage(payload: GetTaskImageDto): Promise<TaskImage> {
    const { project_id, user_id } = payload;
    return await this.taskImageModel
      .aggregate([
        {
          $match: {
            status: 'waiting',
            process: 'doing',
            project_id: project_id,
          },
        },
        {
          $lookup: {
            from: 'task_success',
            localField: 'shortcode',
            foreignField: 'shortcode',
            as: 'task_success',
          },
        },
        {
          $match: { 'task_success.user_id': { $ne: user_id } },
        },
        { $limit: 1 },
      ])
      .exec();
  }

  async getTaskImageByShortcode(
    payload: GetTaskImageByShortcode,
  ): Promise<TaskImage> {
    const { project_id, shortcode } = payload;
    return await this.taskImageModel.findOne({ project_id, shortcode }).exec();
  }

  async updateStatusTaskImage(
    payload: UpdateStatusTaskImageDto,
  ): Promise<TaskImage> {
    const { status, task_id } = payload;

    const data = { status, doingAt: new Date() };

    return await this.taskImageModel
      .findByIdAndUpdate(task_id, data, {
        upsert: false,
        useFindAndModify: false,
      })
      .exec();
  }

  async updateProcessTaskImage(task_id: string): Promise<TaskImage> {
    return await this.taskImageModel.findByIdAndUpdate(
      task_id,
      {
        doneAt: new Date(),
        process: TaskImageProcess.SUCCESS,
        status: TaskImageStatus.SUCCESS,
      },
      { upsert: false, useFindAndModify: false },
    );
  }
}
