import { Module } from '@nestjs/common';
import { TaskimageService } from './taskimage.service';
import { TaskimageController } from './taskimage.controller';

@Module({
  controllers: [TaskimageController],
  providers: [TaskimageService]
})
export class TaskimageModule {}
