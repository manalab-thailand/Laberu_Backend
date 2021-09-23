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

    async updateRemoveDecimal() {
        const taskSuccess = await this.taskSuccessObjectModel.find({ project_id: "613761969a78147603abb475" })
        for (const [index, iterator] of taskSuccess.entries()) {
            const { object, _id, project_id, user_id, task_id, shortcode } = iterator
            let updateRemoveDecimal = [] as any
            for (const data of object) {
                const { name, bndbox } = data
                const { xmin, ymin, xmax, ymax } = bndbox

                updateRemoveDecimal.push({
                    name,
                    bndbox: {
                        xmin: Number(xmin).toFixed(0),
                        ymin: Number(ymin).toFixed(0),
                        xmax: Number(xmax).toFixed(0),
                        ymax: Number(ymax).toFixed(0),
                    }
                })
            }

            await this.taskSuccessObjectModel.updateOne({ _id }, { object: updateRemoveDecimal })

            console.log(index + 1, _id, project_id, user_id, task_id, shortcode, "updated");
        }
    }

}
