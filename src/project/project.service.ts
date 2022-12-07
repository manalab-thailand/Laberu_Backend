import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { FindProjectByCustomerDto } from './dto/find-project-by-customer.dto';
import { AddPermissionRequest, RemovePermissionRequest } from './dto/request';
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
      export_password: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      update_by: '',
      isViewOnlyUsers: [],
    });
    return await createdProject.save();
  }

  async findAll(): Promise<Project[]> {
    return await this.projectModel
      .aggregate([
        {
          $addFields: {
            user_id: {
              $toObjectId: '$project_owner',
            },
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
          },
        },
      ])
      .exec();
  }

  async findProject(project_id: string): Promise<Project> {
    return await this.projectModel
      .findOne({
        _id: project_id,
      })
      .exec();
  }

  async findOne(project_id: string): Promise<Project> {
    return await this.projectModel
      .aggregate([
        {
          $match: {
            _id: project_id,
          },
        },
        {
          $addFields: {
            user_id: {
              $toObjectId: '$project_owner',
            },
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
          },
        },
      ])
      .exec();
  }

  async findProjectByUser(): Promise<Project[]> {
    return await this.projectModel
      .find({ process: ProjectProcess.DOING })
      .sort({ _id: 1 })
      .exec();
  }

  async findProjectByCustomer(
    payload: FindProjectByCustomerDto,
  ): Promise<Project[]> {
    return await this.projectModel
      .aggregate([
        {
          $match: {
            project_owner: payload.user_id,
          },
        },
        {
          $addFields: {
            user_id: {
              $toObjectId: '$project_owner',
            },
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
          },
        },
      ])
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

  async addPermission(payload: AddPermissionRequest) {
    const { project_id, user } = payload;

    const project = await this.projectModel.findOne({
      _id: project_id,
    });

    if (!project) return;

    const permission = project.permission;

    permission.push({
      ...user,
      createdAt: new Date(),
    });

    return await this.projectModel
      .findByIdAndUpdate(
        project_id,
        {
          update_by: 'admin',
          updatedAt: new Date(),
          permission: permission,
        },
        { upsert: false, useFindAndModify: false },
      )
      .exec();
  }

  async removePermission(payload: RemovePermissionRequest) {
    const { project_id, user_id } = payload;

    const project = await this.projectModel.findOne({
      _id: project_id,
    });

    if (!project) return;

    const permission = project.permission.filter((x) => x.user !== user_id);

    return await this.projectModel
      .findByIdAndUpdate(
        project_id,
        {
          update_by: 'admin',
          updatedAt: new Date(),
          permission: permission,
        },
        { upsert: false, useFindAndModify: false },
      )
      .exec();
  }
}
