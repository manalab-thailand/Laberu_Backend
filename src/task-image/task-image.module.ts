import { Module } from '@nestjs/common';
import { TaskImageService } from './task-image.service';
import { TaskImageController } from './task-image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskImage, TaskImageSchema } from './entities/task-image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskImage.name, schema: TaskImageSchema },
    ]),
  ],
  controllers: [TaskImageController],
  providers: [TaskImageService],
})
export class TaskImageModule {}
