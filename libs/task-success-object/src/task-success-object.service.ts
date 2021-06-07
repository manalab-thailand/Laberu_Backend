import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskSuccessObject } from './dto/create.dto';
import { FindCountSuccessByShortcode } from './dto/find-count-by-shortcode.dto';
import { FindTaskSuccessByUserId } from './dto/find-task-success-by-userid.dto';
import { TaskSuccessObject, TaskSuccessObjectDocument } from './entity/task-success-object-entity';

@Injectable()
export class TaskSuccessObjectService {

    constructor(
        @InjectModel(TaskSuccessObject.name)
        private readonly taskSuccessObjectModel: Model<TaskSuccessObjectDocument>
    ) { }

    async createTaskSuccessObject(payload: CreateTaskSuccessObject): Promise<any> {
        const createTaskSuccessObject = new this.taskSuccessObjectModel(payload);
        await createTaskSuccessObject.save();
    }

    async findCountSuccessByShortcode(payload: FindCountSuccessByShortcode): Promise<any> {
        const { shortcode } = payload
        return await this.taskSuccessObjectModel.count({ shortcode }).exec()
    }

    async findTaskSuccessByUserId(payload: FindTaskSuccessByUserId): Promise<any> {
        const { user_id } = payload
        return await this.taskSuccessObjectModel.find({ user_id }).exec()
    }

}
