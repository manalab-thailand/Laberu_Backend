import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateProjectManagement } from './dto/create.dto';
import { FindProjectById } from './dto/find-project-by-id.dto';
import { ProjectmanagementService } from './projectmanagement.service';

@Controller('projectmanagement')
export class ProjectmanagementController {
  constructor(private readonly projectmanagementService: ProjectmanagementService) { }

  @Post('create')
  async create(@Body() payload: CreateProjectManagement): Promise<any> {
    return await this.projectmanagementService.createProjectManagement(payload);
  }

  @Get('findProjectById')
  async findOneProject(@Body() payload: FindProjectById): Promise<any> {
    return await this.projectmanagementService.findProjectById(payload);
  }

}
