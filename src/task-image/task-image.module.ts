import { Module } from '@nestjs/common';
import { TaskImageService } from './task-image.service';
import { TaskImageController } from './task-image.controller';

@Module({
  controllers: [TaskImageController],
  providers: [TaskImageService]
})
export class TaskImageModule {}
