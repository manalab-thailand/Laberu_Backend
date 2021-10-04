import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskSuccessAnnotation } from './dto/create.dto';
import { FindCountTaskSuccessAnnotationByProject } from './dto/find-count-by-project.dto';
import { FindCountSuccessByShortcode } from './dto/find-count-by-shortcode.dto';
import { FindTaskSuccessByUserId } from './dto/find-task-success-by-userid.dto';
import {
  TaskSuccessAnnotation,
  TaskSuccessAnnotationDocument,
} from './entity/task-success.entity';

@Injectable()
export class TaskSuccessAnnotationService {
  constructor(
    @InjectModel(TaskSuccessAnnotation.name)
    private readonly taskSuccessAnnotationModel: Model<TaskSuccessAnnotationDocument>,
  ) {}

  async createTaskSuccessAnnotation(
    payload: CreateTaskSuccessAnnotation,
  ): Promise<any> {
    const createTaskSuccessAnnotation = new this.taskSuccessAnnotationModel(
      payload,
    );
    await createTaskSuccessAnnotation.save();
  }

  async findCountSuccessByShortcode(
    payload: FindCountSuccessByShortcode,
  ): Promise<any> {
    const { shortcode, project_id } = payload;
    return await this.taskSuccessAnnotationModel
      .countDocuments({ shortcode, project_id })
      .exec();
  }

  async findTaskSuccessByUserId(
    payload: FindTaskSuccessByUserId,
  ): Promise<any> {
    const { user_id } = payload;
    return await this.taskSuccessAnnotationModel.find({ user_id }).exec();
  }

  async findCountTaskSuccessByUserId(
    payload: FindTaskSuccessByUserId,
  ): Promise<any> {
    const { user_id } = payload;
    return await this.taskSuccessAnnotationModel
      .countDocuments({ user_id })
      .exec();
  }

  async findImageSuccessByProjectId(project_id: string) {
    return await this.taskSuccessAnnotationModel.find({ project_id }).exec();
  }

  async findTaskSuccessAnnotationByProjectId(
    payload: FindCountTaskSuccessAnnotationByProject,
  ): Promise<any> {
    const { project_id } = payload;
    return await this.taskSuccessAnnotationModel.find({ project_id }).exec();
  }

  async findCountTaskSuccessAnnotationByProjectId(
    payload: FindCountTaskSuccessAnnotationByProject,
  ): Promise<any> {
    const { project_id } = payload;
    return await this.taskSuccessAnnotationModel
      .countDocuments({ project_id })
      .exec();
  }
}
