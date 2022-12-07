import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TaskImageReject,
  TaskImageRejectSchema,
} from 'src/task-image-reject/entities/task-image-reject.schema';
import {
  TaskImage,
  TaskImageSchema,
} from 'src/task-image/entities/task-image.schema';
import {
  TaskSuccess,
  TaskSuccessSchema,
} from 'src/task-success/entities/task-success.schema';
import { ScheduleTaskImageService } from './schedule.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskImage.name, schema: TaskImageSchema },
      { name: TaskImageReject.name, schema: TaskImageRejectSchema },
      { name: TaskSuccess.name, schema: TaskSuccessSchema },
    ]),
  ],
  providers: [ScheduleTaskImageService],
})
export class ScheduleTaskImageModule {}
