import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>,
  ) { }

  async create(createProjectDto: CreateProjectDto) {
    const createdProject = new this.projectModel(createProjectDto);
    return await createdProject.save();
  }

  async findProject() {
    return await this.projectModel.find().exec();
  }

  async updateProject(_id: String, updateProjectDto: UpdateProjectDto) {
    await this.projectModel.updateOne(
      { _id: _id },
      {
        project_name: updateProjectDto.project_name,
        labelType: updateProjectDto.labelType,
        labelingCount: updateProjectDto.labelingCount,
        baseImageUrl: updateProjectDto.baseImageUrl,
        customerID: updateProjectDto.customerID,
      },
      { upsert: false }
    ).exec()
  }

}
