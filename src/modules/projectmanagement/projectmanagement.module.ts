import { Module } from '@nestjs/common';
import { ProjectmanagementService } from './projectmanagement.service';
import { ProjectmanagementController } from './projectmanagement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectManagement, ProjectManagementSchema } from './entity/project-management-entity';
import { ImageData, ImageDataSchema } from '../imagedata/entity/image-datum.entity';
import { TaskImageObject, TaskImageObjectSchema } from '@laberu/task-image-object/entity/task-iamge-object-entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: ProjectManagement.name, schema: ProjectManagementSchema },
        { name: ImageData.name, schema: ImageDataSchema },
        { name: TaskImageObject.name, schema: TaskImageObjectSchema },
      ]
    ),

  ],
  controllers: [ProjectmanagementController],
  providers: [ProjectmanagementService]
})
export class ProjectmanagementModule { }
