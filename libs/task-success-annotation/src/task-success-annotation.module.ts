import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSuccessAnnotation, TaskSuccessAnnotationSchema } from './entity/task-success.entity';
import { TaskSuccessAnnotationService } from './task-success-annotation.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaskSuccessAnnotation.name, schema: TaskSuccessAnnotationSchema }])],
  providers: [TaskSuccessAnnotationService],
  exports: [TaskSuccessAnnotationService],
})
export class TaskSuccessAnnotationModule { }
