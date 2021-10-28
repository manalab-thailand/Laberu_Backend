import { Module } from '@nestjs/common';
import { TaskSuccessService } from './task-success.service';
import { TaskSuccessController } from './task-success.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSuccess, TaskSuccessSchema } from './entities/task-success.schema';
import { Project, ProjectSchema } from 'src/project/entities/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskSuccess.name, schema: TaskSuccessSchema },
    ]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [TaskSuccessController],
  providers: [TaskSuccessService],
})
export class TaskSuccessModule {}
