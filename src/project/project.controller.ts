import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.schema';
import { FindProjectByCustomerDto } from './dto/find-project-by-customer.dto';
import { UpdateProjectProcessDto } from './dto/update-project-process.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  async createProject(@Body() payload: CreateProjectDto): Promise<Project> {
    return await this.projectService.create(payload);
  }

  @Get('find-all')
  async findAllProject(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Get('find-by-user')
  async findByUser(): Promise<Project[]> {
    return await this.projectService.findProjectByUser();
  }

  @Get('find-by-customer')
  async findByCustomer(
    @Query() payload: FindProjectByCustomerDto,
  ): Promise<Project[]> {
    return await this.projectService.findProjectByCustomer(payload);
  }

  @Put('update')
  async updateProject(@Body() payload: UpdateProjectDto): Promise<Project> {
    return await this.projectService.updateProject(payload);
  }

  @Put('update-process')
  async updateProjectProcess(
    @Body() payload: UpdateProjectProcessDto,
  ): Promise<Project> {
    return await this.projectService.updateProjectSuccess(payload);
  }
}
