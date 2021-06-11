import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskSuccessObject } from './dto/create.dto';
import { FindCountTaskSuccessObjectByProject } from './dto/find-count-by-project.dto';
import { FindCountSuccessByShortcode } from './dto/find-count-by-shortcode.dto';
import { FindTaskSuccessByUserId } from './dto/find-task-success-by-userid.dto';
import { TaskSuccessObject, TaskSuccessObjectDocument } from './entity/task-success-object-entity';
import { ITaskSuccessObjectService } from './task-success-object-interface.service';

@Injectable()
export class TaskSuccessObjectService implements ITaskSuccessObjectService {

    constructor(
        @InjectModel(TaskSuccessObject.name)
        private readonly taskSuccessObjectModel: Model<TaskSuccessObjectDocument>
    ) { }

    async createTaskSuccessObject(payload: CreateTaskSuccessObject): Promise<any> {
        console.log(payload);
        const createTaskSuccessObject = new this.taskSuccessObjectModel(payload);
        await createTaskSuccessObject.save();
    }

    async findCountSuccessByShortcode(payload: FindCountSuccessByShortcode): Promise<any> {
        const { shortcode, project_id } = payload
        return await this.taskSuccessObjectModel.countDocuments({ shortcode, project_id }).exec()
    }

    async findTaskSuccessByUserId(payload: FindTaskSuccessByUserId): Promise<any> {
        const { user_id } = payload
        return await this.taskSuccessObjectModel.find({ user_id }).exec()
    }

    async findCountTaskSuccessByUserId(payload: FindTaskSuccessByUserId): Promise<any> {
        const { user_id } = payload
        return await this.taskSuccessObjectModel.countDocuments({ user_id }).exec()
    }

    async findTaskSuccessObjectByProjectId(payload: FindCountTaskSuccessObjectByProject): Promise<any> {
        const { project_id } = payload
        return await this.taskSuccessObjectModel.find({ project_id }).exec()
    }

    async findCountTaskSuccessObjectByProjectId(payload: FindCountTaskSuccessObjectByProject): Promise<any> {
        const { project_id } = payload
        return await this.taskSuccessObjectModel.countDocuments({ project_id }).exec()
    }

}
