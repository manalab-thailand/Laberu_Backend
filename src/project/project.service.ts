import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { FindProjectByCustomerDto } from './dto/find-project-by-customer.dto';
import { UpdateProjectProcessDto } from './dto/update-project-process.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './entities/project.schema';
import { ProjectProcess } from './interface/project.enum';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async create(payload: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel({
      ...payload,
      createAt: new Date(),
      updatedAt: new Date(),
      update_by: '',
    });
    return await createdProject.save();
  }

  async findAll(): Promise<Project[]> {
    return await this.projectModel.find().exec();
  }

  async findOne(project_id: string): Promise<Project> {
    return await this.projectModel.findOne({ _id: project_id }).exec();
  }

  async findProjectByUser(): Promise<Project[]> {
    return await this.projectModel
      .find({ process: ProjectProcess.DOING })
      .exec();
  }

  async findProjectByCustomer(
    payload: FindProjectByCustomerDto,
  ): Promise<Project[]> {
    return await this.projectModel
      .find({ project_owner: payload.user_id })
      .exec();
  }

  async updateProject(payload: UpdateProjectDto): Promise<Project> {
    const { _id, ...data } = payload;
    return await this.projectModel
      .findByIdAndUpdate(
        _id,
        { ...data, updatedAt: new Date() },
        { upsert: false, useFindAndModify: false },
      )
      .exec();
  }

  async updateProjectSuccess(payload: UpdateProjectProcessDto) {
    const { process, project_id, update_by } = payload;
    return await this.projectModel
      .findByIdAndUpdate(
        project_id,
        { process, update_by, updatedAt: new Date() },
        { upsert: false, useFindAndModify: false },
      )
      .exec();
  }
}
