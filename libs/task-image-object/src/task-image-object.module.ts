import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskImageObject, TaskImageObjectSchema } from './entity/task-iamge-object-entity';
import { TaskImageObjectService } from './task-image-object.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaskImageObject.name, schema: TaskImageObjectSchema }])],
  providers: [TaskImageObjectService],
  exports: [TaskImageObjectService],
})
export class TaskImageObjectModule { }
