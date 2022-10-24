import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TaskSuccess,
  TaskSuccessSchema,
} from 'src/task-success/entities/task-success.schema';
import { User, UserSchema } from 'src/user/entities/user.schema';
import {
  TaskImageReject,
  TaskImageRejectSchema,
} from './entities/task-image-reject.schema';
import { TaskImageRejectController } from './task-image-reject.controller';
import { TaskImageRejectService } from './task-image-reject.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskImageReject.name, schema: TaskImageRejectSchema },
      { name: TaskSuccess.name, schema: TaskSuccessSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TaskImageRejectController],
  providers: [TaskImageRejectService],
})
export class TaskImageRejectModule {}
