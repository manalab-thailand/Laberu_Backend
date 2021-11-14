import { Module } from '@nestjs/common';
import { TaskSuccessService } from './task-success.service';
import { TaskSuccessController } from './task-success.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSuccess, TaskSuccessSchema } from './entities/task-success.schema';
import { Project, ProjectSchema } from 'src/project/entities/project.schema';
import {
  TaskImage,
  TaskImageSchema,
} from 'src/task-image/entities/task-image.schema';
import { ProjectService } from 'src/project/project.service';
import { TaskImageService } from 'src/task-image/task-image.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskSuccess.name, schema: TaskSuccessSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: TaskImage.name, schema: TaskImageSchema },
    ]),
  ],
  controllers: [TaskSuccessController],
  providers: [TaskSuccessService, ProjectService, TaskImageService],
})
export class TaskSuccessModule {}
