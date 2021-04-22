import { Module } from '@nestjs/common';
import { TaskSuccessService } from './task-success.service';
import { TaskSuccessController } from './task-success.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSuccess, TaskSuccessSchema } from './entities/task-success.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaskSuccess.name, schema: TaskSuccessSchema }])],
  controllers: [TaskSuccessController],
  providers: [TaskSuccessService]
})
export class TaskSuccessModule { }
