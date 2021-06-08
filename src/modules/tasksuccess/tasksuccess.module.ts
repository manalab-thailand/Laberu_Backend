import { Module } from '@nestjs/common';
import { TasksuccessService } from './tasksuccess.service';
import { TasksuccessController } from './tasksuccess.controller';

@Module({
  controllers: [TasksuccessController],
  providers: [TasksuccessService]
})
export class TasksuccessModule {}
