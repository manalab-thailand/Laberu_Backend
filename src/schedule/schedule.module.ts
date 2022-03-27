import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TaskImage,
  TaskImageSchema,
} from 'src/task-image/entities/task-image.schema';
import { ScheduleTaskImageService } from './schedule.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskImage.name, schema: TaskImageSchema },
    ]),
  ],
  providers: [ScheduleTaskImageService],
})
export class ScheduleTaskImageModule {}
