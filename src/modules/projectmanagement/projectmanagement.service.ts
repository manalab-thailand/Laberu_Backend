import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectManagement } from './dto/create.dto';
import { FindProjectById } from './dto/find-project-by-id.dto';
import { ProjectManagement, ProjectManagementDocument } from './entity/project-management-entity';

@Injectable()
export class ProjectmanagementService {

    constructor(
        @InjectModel(ProjectManagement.name)
        private readonly ProjectManagementModel: Model<ProjectManagementDocument>
    ) { }

    async createProjectManagement(payload: CreateProjectManagement): Promise<any> {
        const createProjectManagement = new this.ProjectManagementModel(payload);
        await createProjectManagement.save();
        return createProjectManagement
    }

    async findAllProject(): Promise<any> {
        return await this.ProjectManagementModel.find({ process: false }).exec();
    }

    async findProjectById(payload: FindProjectById): Promise<ProjectManagement> {
        const { id } = payload
        return await this.ProjectManagementModel.findOne({ _id: id }).exec()
    }
}
