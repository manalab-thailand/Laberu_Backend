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

    return await this.taskImageModel
      .findByIdAndUpdate(
        task_id,
        { status, doingAt: new Date() },
        { upsert: false, useFindAndModify: false },
      )
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

  validateHour(date) {
    return Number(moment().diff(moment(date), 'hours'));
  }

  async resetTask() {
    try {
      const taskImages = await this.taskImageModel
        .find({
          status: TaskImageStatus.DOING,
          process: TaskImageProcess.DOING,
          doingAt: { $ne: null },
        })
        .exec();

      if (taskImages) {
        const listId = taskImages
          .filter((taskImage) => this.validateHour(taskImage.doingAt) > 2)
          .map((taskImage) => taskImage._id);

        if (listId) {
          await this.taskImageModel.updateMany(
            { _id: { $in: listId } },
            {
              $set: {
                status: TaskImageStatus.WAITING,
                doingAt: null,
              },
            },
            { upsert: false },
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCron() {
    await this.resetTask();
  }
}
