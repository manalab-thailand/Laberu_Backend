import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectManagement, ProjectManagementSchema } from './entity/project-management-entity';
import { ProjectManagementService } from './project-management.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectManagement.name, schema: ProjectManagementSchema }])],
  providers: [ProjectManagementService],
  exports: [ProjectManagementService],
})
export class ProjectManagementModule { }
