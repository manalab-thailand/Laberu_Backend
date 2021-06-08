import { Module } from '@nestjs/common';
import { TaskimageService } from './taskimage.service';
import { TaskimageController } from './taskimage.controller';
import { TaskImageObjectModule } from '@laberu/task-image-object';
import { TaskImageAnnotationModule } from 'libs/task-image-annotation/src';

@Module({
  imports: [TaskImageObjectModule, TaskImageAnnotationModule],
  controllers: [TaskimageController],
  providers: [TaskimageService]
})
export class TaskimageModule { }
