import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { get } from 'http';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post('/create')
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @Get('/')
  async find() {
    return await this.projectService.findProject();
  }

  @Put('/update/:_id')
  async updateProject(@Param('_id') _id: String, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectService.updateProject(_id, updateProjectDto);
  }
}
