import { Module } from '@nestjs/common';
import { TasksuccessService } from './tasksuccess.service';
import { TasksuccessController } from './tasksuccess.controller';
import { TaskSuccessObjectModule } from '@laberu/task-success-object';
import { TaskSuccessAnnotationModule } from 'libs/task-success-annotation/src';

@Module({
  imports: [TaskSuccessObjectModule, TaskSuccessAnnotationModule],
  controllers: [TasksuccessController],
  providers: [TasksuccessService]
})
export class TasksuccessModule { }
