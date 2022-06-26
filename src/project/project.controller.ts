import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.schema';
import { FindProjectByCustomerDto } from './dto/find-project-by-customer.dto';
import { UpdateProjectProcessDto } from './dto/update-project-process.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddPermissionRequest, RemovePermissionRequest } from './dto/request';

// @UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @HttpCode(200)
  @Post('create')
  async createProject(@Body() payload: CreateProjectDto): Promise<Project> {
    return await this.projectService.create(payload);
  }

  @HttpCode(200)
  @Get('find-all')
  async findAllProject(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @HttpCode(200)
  @Get('find-by-user')
  async findByUser(): Promise<Project[]> {
    return await this.projectService.findProjectByUser();
  }

  @HttpCode(200)
  @Get('find-by-customer')
  async findByCustomer(
    @Query() payload: FindProjectByCustomerDto,
  ): Promise<Project[]> {
    return await this.projectService.findProjectByCustomer(payload);
  }

  @HttpCode(200)
  @Post('add-permission')
  async addPermission(@Body() payload: AddPermissionRequest): Promise<Project> {
    return await this.projectService.addPermission(payload);
  }

  @HttpCode(200)
  @Delete('remove-permission')
  async removePermission(
    @Body() payload: RemovePermissionRequest,
  ): Promise<Project> {
    return await this.projectService.removePermission(payload);
  }

  @HttpCode(200)
  @Put('update')
  async updateProject(@Body() payload: UpdateProjectDto): Promise<Project> {
    return await this.projectService.updateProject(payload);
  }

  @HttpCode(200)
  @Put('update-process')
  async updateProjectProcess(
    @Body() payload: UpdateProjectProcessDto,
  ): Promise<Project> {
    return await this.projectService.updateProjectSuccess(payload);
  }
}
