import { TaskImageObject, TaskImageObjectDocument } from '@laberu/task-image-object/entity/task-iamge-object-entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as rd from 'readline'
import { Model } from 'mongoose';
import { dirname } from 'path';
import { ImageData, ImageDataDocument } from '../imagedata/entity/image-datum.entity';
import { CreateProjectManagement } from './dto/create.dto';
import { FindProjectById } from './dto/find-project-by-id.dto';
import { ProjectManagement, ProjectManagementDocument } from './entity/project-management-entity';

@Injectable()
export class ProjectmanagementService {

    constructor(
        @InjectModel(ProjectManagement.name)
        private readonly ProjectManagementModel: Model<ProjectManagementDocument>,
        @InjectModel(ImageData.name)
        private readonly ImageDataModel: Model<ImageDataDocument>,
        @InjectModel(TaskImageObject.name)
        private readonly TaskImageModel: Model<TaskImageObjectDocument>,
    ) { }

    async createProjectManagement(payload: CreateProjectManagement): Promise<any> {
        const createProjectManagement = new this.ProjectManagementModel(payload);
        await createProjectManagement.save();
        return createProjectManagement
    }

    async findProject() {
        return await this.ProjectManagementModel.find().exec()
    }

    async findAllProject(): Promise<any> {
        return await this.ProjectManagementModel.find({ process: false }).exec();
    }

    async findProjectById(payload: FindProjectById): Promise<ProjectManagement> {
        const { id } = payload
        return await this.ProjectManagementModel.findOne({ _id: id }).exec()
    }
}
