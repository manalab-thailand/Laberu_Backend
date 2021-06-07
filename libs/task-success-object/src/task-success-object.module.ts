import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSuccessObject, TaskSuccessObjectSchema } from './entity/task-success-object-entity';
import { TaskSuccessObjectService } from './task-success-object.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaskSuccessObject.name, schema: TaskSuccessObjectSchema }])],
  providers: [TaskSuccessObjectService],
  exports: [TaskSuccessObjectService],
})
export class TaskSuccessObjectModule { }
