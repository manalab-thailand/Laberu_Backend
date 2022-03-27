import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import {
  TaskImage,
  TaskImageDocument,
} from 'src/task-image/entities/task-image.schema';
import {
  TaskImageProcess,
  TaskImageStatus,
} from 'src/task-image/interface/task-image.enum';
import * as moment from 'moment';

@Injectable()
export class ScheduleTaskImageService {
  constructor(
    @InjectModel(TaskImage.name)
    private readonly taskImageModel: Model<TaskImageDocument>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const taskImages = await this.taskImageModel.find({
      status: TaskImageStatus.DOING,
      process: TaskImageProcess.DOING,
      doingAt: {
        $ne: null,
      },
    });

    const listIds = taskImages
      .filter((x) => moment().diff(x.doingAt, 'hours') > 2)
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
}
