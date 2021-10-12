import { Module } from '@nestjs/common';
import { TaskImageService } from './task-image.service';
import { TaskImageController } from './task-image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskImage, TaskImageSchema } from './entities/task-image.schema';
import {
  TaskSuccess,
  TaskSuccessSchema,
} from 'src/task-success/entities/task-success.schema';
import { ImageDataService } from 'src/image-data/image-data.service';
import {
  ImageData,
  ImageDataSchema,
} from 'src/image-data/entities/image-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskImage.name, schema: TaskImageSchema },
      { name: TaskSuccess.name, schema: TaskSuccessSchema },
      { name: ImageData.name, schema: ImageDataSchema },
    ]),
  ],
  controllers: [TaskImageController],
  providers: [TaskImageService, ImageDataService],
})
export class TaskImageModule {}
