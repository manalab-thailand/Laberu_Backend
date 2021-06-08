import { Module } from '@nestjs/common';
import { ProjectmanagementService } from './projectmanagement.service';
import { ProjectmanagementController } from './projectmanagement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectManagement, ProjectManagementSchema } from './entity/project-management-entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectManagement.name, schema: ProjectManagementSchema }])],
  controllers: [ProjectmanagementController],
  providers: [ProjectmanagementService]
})
export class ProjectmanagementModule { }
