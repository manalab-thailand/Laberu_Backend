import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectManagement } from './dto/create.dto';
import { FindProjectById } from './dto/find-project-by-id.dto';
import { ProjectManagement, ProjectManagementDocument } from './entity/project-management-entity';
import { IProjectManagementService } from './project-management-interface.service';

@Injectable()
export class ProjectManagementService implements IProjectManagementService {

    constructor(
        @InjectModel(ProjectManagement.name)
        private readonly ProjectManagementModel: Model<ProjectManagementDocument>
    ) { }

    async createProjectManagement(payload: CreateProjectManagement): Promise<any> {
        const createProjectManagement = new this.ProjectManagementModel(payload);
        await createProjectManagement.save();
    }

    async findProjectById(payload: FindProjectById): Promise<ProjectManagement> {
        const { id } = payload
        return await this.ProjectManagementModel.findById({ id })
    }

}
