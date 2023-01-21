import { Module } from '@nestjs/common';
import { TaskImageService } from './task-image.service';
import { TaskImageController } from './task-image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskImage, TaskImageSchema } from './entities/task-image.schema';
import { ImageDataService } from 'src/image-data/image-data.service';
import {
  ImageData,
  ImageDataSchema,
} from 'src/image-data/entities/image-data.schema';
import { Project, ProjectSchema } from 'src/project/entities/project.schema';
import { ProjectService } from 'src/project/project.service';
import {
  TaskSuccess,
  TaskSuccessSchema,
} from 'src/task-success/entities/task-success.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskImage.name, schema: TaskImageSchema },
      { name: ImageData.name, schema: ImageDataSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: TaskSuccess.name, schema: TaskSuccessSchema },
    ]),
  ],
  controllers: [TaskImageController],
  providers: [TaskImageService, ImageDataService, ProjectService],
})
export class TaskImageModule {}
