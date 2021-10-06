import { Module } from '@nestjs/common';
import { TaskSuccessService } from './task-success.service';
import { TaskSuccessController } from './task-success.controller';

@Module({
  controllers: [TaskSuccessController],
  providers: [TaskSuccessService]
})
export class TaskSuccessModule {}
