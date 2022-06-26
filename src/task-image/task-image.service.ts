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
import e from 'express';

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
          $match: {
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

  async recheck(payload: { limit: number; skip: number }) {
    try {
      const countTaskImages = await this.taskImageModel
        .find({
          status: TaskImageStatus.SUCCESS,
          process: TaskImageProcess.SUCCESS,
          project_id: '6231ec988da4a55c9c8f82d0',
        })
        .countDocuments();

      console.log(countTaskImages);

      const taskImages = await this.taskImageModel
        .find({
          status: TaskImageStatus.SUCCESS,
          process: TaskImageProcess.SUCCESS,
          project_id: '6231eebb8da4a5a8a0994626',
        })
        .limit(Number(payload.limit))
        .skip(Number(payload.skip))
        .exec();

      let total_paid = 0;
      const map_task_id = [];

      for (const [index, iterator] of taskImages.entries()) {
        const { _id: task_id } = iterator;

        const tasks_success = await this.taskSuccessModel.find({
          task_id,
        });

        if (tasks_success.length > 1) {
          console.log(tasks_success.length, 'มากกว่า 1', index);
          total_paid = total_paid + tasks_success.length - 1;
        } else if (tasks_success.length === 0) {
          console.log('เคสอัพเดทเกิน', index);
          map_task_id.push(task_id);
        } else {
          console.log('ปกติ', index);
        }
      }

      await this.taskImageModel.updateMany(
        {
          _id: { $in: map_task_id },
        },
        {
          $set: {
            status: TaskImageStatus.WAITING,
            process: TaskImageProcess.DOING,
          },
        },
        { multi: true, upsert: false },
      );

      console.log('จำนวนเงินเกินทั้งหมด', total_paid);

      // 28 + 493 + 493 + 1349 + 2 + 1 = 2366 //! project1 2366 THB

      // 2 //! project2 2 THB

      // 2 + 5 + 3 + 9 //! project3 19 THB

      return taskImages;
    } catch (error) {
      console.log(error);
    }
  }
}
