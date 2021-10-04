import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { get } from 'http';
import { CreateProjectManagement } from './dto/create.dto';
import { FindProjectById } from './dto/find-project-by-id.dto';
import { ProjectManagement } from './entity/project-management-entity';
import { ProjectmanagementService } from './projectmanagement.service';

@Controller('projectmanagement')
export class ProjectmanagementController {
  constructor(
    private readonly projectmanagementService: ProjectmanagementService,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateProjectManagement): Promise<any> {
    return await this.projectmanagementService.createProjectManagement(payload);
  }

  @Get('')
  async findListProject() {
    return await this.projectmanagementService.findProject();
  }

  @Get('findProject')
  async findProject(): Promise<ProjectManagement> {
    return await this.projectmanagementService.findAllProject();
  }

  @Get('findOneProject/:project_id')
  async findProjectOne(@Param() { project_id }) {
    return await this.projectmanagementService.findProjectById({
      id: project_id,
    });
  }

  @Get('findProjectById')
  async findOneProject(
    @Body() payload: FindProjectById,
  ): Promise<ProjectManagement> {
    return await this.projectmanagementService.findProjectById(payload);
  }
}
