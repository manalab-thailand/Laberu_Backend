import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskImageAnnotation, TaskImageAnnotationSchema } from './entity/task-image.entity';
import { TaskImageAnnotationService } from './task-image-annotation.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaskImageAnnotation.name, schema: TaskImageAnnotationSchema }])],
  providers: [TaskImageAnnotationService],
  exports: [TaskImageAnnotationService],
})
export class TaskImageAnnotationModule { }
