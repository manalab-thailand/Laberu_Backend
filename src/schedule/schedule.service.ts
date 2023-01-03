import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model, Mongoose, Types } from 'mongoose';
import {
  TaskImage,
  TaskImageDocument,
} from 'src/task-image/entities/task-image.schema';
import {
  TaskImageProcess,
  TaskImageStatus,
} from 'src/task-image/interface/task-image.enum';
import * as moment from 'moment';
import {
  TaskImageReject,
  TaskImageRejectDocument,
} from 'src/task-image-reject/entities/task-image-reject.schema';
import {
  TaskSuccess,
  TaskSuccessDocument,
} from 'src/task-success/entities/task-success.schema';

@Injectable()
export class ScheduleTaskImageService {
  constructor(
    @InjectModel(TaskImage.name)
    private readonly taskImageModel: Model<TaskImageDocument>,
    @InjectModel(TaskImageReject.name)
    private readonly taskImageRejectModel: Model<TaskImageRejectDocument>,
    @InjectModel(TaskSuccess.name)
    private readonly taskSuccessModel: Model<TaskSuccessDocument>,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    const taskImages = await this.taskImageModel.find({
      status: TaskImageStatus.DOING,
      process: TaskImageProcess.DOING,
      doingAt: {
        $ne: null,
      },
    });
    if (!taskImages.length) return;
    const listIds = taskImages
      .filter((x) => moment().diff(x.doingAt, 'hours') > 1)
      .map((x) => x._id);
    await this.taskImageModel.updateMany(
      {
        _id: {
          $in: listIds,
        },
      },
      {
        $set: {
          status: TaskImageStatus.WAITING,
          doingAt: null,
        },
      },
      { upsert: false },
    );
  }

  // @Cron(CronExpression.EVERY_DAY_AT_2AM)
  // async handlerCronTaskReject() {
  //   const taskImageRejects = await this.taskImageRejectModel.find({
  //     status: 'waiting',
  //   });

  //   if (!taskImageRejects.length) return;

  //   const filterTask = taskImageRejects.filter(
  //     (x) => moment().diff(x.createdAt, 'days') > 7,
  //   );

  //   await this.taskImageRejectModel.deleteMany({
  //     _id: {
  //       $in: filterTask.map((x) => x._id),
  //     },
  //   });

  //   const mapTaskImage = filterTask.map((x) => ({
  //     shortcode: x.shortcode,
  //     project_id: x.project_id,
  //     task_success_id: x.task_success_id,
  //   }));

  //   const uniqueProjectId = [
  //     ...new Set(filterTask.map((x) => x.project_id.toHexString())),
  //   ];

  //   for await (const project_id of uniqueProjectId) {
  //     const mapShortcodes = mapTaskImage
  //       .filter((x) => x.project_id.toHexString() === project_id)
  //       .map((x) => x.shortcode);

  //     const mapTaskSuccess = mapTaskImage
  //       .filter((x) => x.project_id.toHexString() === project_id)
  //       .map((x) => x.task_success_id);

  //     await this.taskImageModel.updateMany(
  //       {
  //         shortcode: {
  //           $in: mapShortcodes,
  //         },
  //         project_id: project_id,
  //       },
  //       {
  //         $set: {
  //           status: TaskImageStatus.WAITING,
  //           process: TaskImageProcess.DOING,
  //           doingAt: null,
  //         },
  //       },
  //       { upsert: false },
  //     );

  //     await this.taskSuccessModel.updateMany(
  //       {
  //         _id: {
  //           $in: mapTaskSuccess,
  //         },
  //         accept: false,
  //         project_id: project_id,
  //       },
  //       {
  //         $set: {
  //           user_id: null,
  //         },
  //       },
  //       { upsert: false },
  //     );
  //   }
  // }
}
