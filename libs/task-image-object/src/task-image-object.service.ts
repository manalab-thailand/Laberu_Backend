import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindCountTaskImage } from 'src/modules/taskimage/dto/find-count.dto';
import { CreateTaskImageObject } from './dto/create-task-image-object.dto';
import { CreateTaskImageManyObject } from './dto/create-task-many-object.dto';
import { QueryImageObject } from './dto/query-image.dto';
import { UpdateProcessImageOjbect } from './dto/update-process.dto';
import { UpdateStatusImageOjbect } from './dto/update-status.dto';
import { TaskImageObject, TaskImageObjectDocument } from './entity/task-iamge-object-entity';
import { ITaskImageObjectService } from './task-image-object-interface.service';

@Injectable()
export class TaskImageObjectService implements ITaskImageObjectService {

    constructor(
        @InjectModel(TaskImageObject.name)
        private readonly taskIamgeObjectModel: Model<TaskImageObjectDocument>
    ) { }

    async createTaskImageObject(payload: CreateTaskImageObject): Promise<any> {
        const createTaskImageObject = new this.taskIamgeObjectModel(payload);
        await createTaskImageObject.save();
    }

    async createTaskImageManyObject(payload: CreateTaskImageManyObject): Promise<any> {
        const { mapdata } = payload
        return await this.taskIamgeObjectModel.insertMany(mapdata);
    }

    async findCountTaskImageObject(payload: FindCountTaskImage): Promise<any> {
        const { project_id } = payload
        return await this.taskIamgeObjectModel.countDocuments({ process: true, project_id }).exec()
    }

    async queryImageObject(payload: QueryImageObject): Promise<TaskImageObject> {
        const { user_id, project_id } = payload;
        return await this.taskIamgeObjectModel.aggregate([
            { $match: { status: false, process: false, project_id } },
            {
                $lookup: {
                    from: "task_success_object",
                    localField: "shortcode",
                    foreignField: "shortcode",
                    as: "TaskSuccess"
                }
            },
            { $match: { "TaskSuccess.user_id": { $ne: user_id } } },
            { $limit: 1 }
        ]).exec();
    }

    async updateStatusObject(payload: UpdateStatusImageOjbect): Promise<any> {
        const { id, status, time_start } = payload
        await this.taskIamgeObjectModel.updateOne(
            { _id: id },
            {
                time_start,
                status,
            },
            { upsert: true },
        )
    }

    async updateProcessObject(payload: UpdateProcessImageOjbect): Promise<any> {
        const { id, status, process, time_start } = payload
        await this.taskIamgeObjectModel.updateOne(
            { _id: id },
            {
                time_start,
                status,
                process,
            },
            { upsert: true },
        )
    }

    async findTaskImageObjectResidualWork(): Promise<any> {
        const taskImageResidualWork = await this.taskIamgeObjectModel.find({ status: true, process: false }).exec()
        return taskImageResidualWork.forEach(doc => {
            const millis = Date.now() - Number(doc.time_start);
            const second = Math.floor(millis / 1000);
            if (second >= 5400) {
                this.taskIamgeObjectModel.updateOne(
                    { _id: doc._id },
                    {
                        status: false,
                        process: false,
                        time_start: "0",
                    },
                    { upsert: true },
                ).exec();
            }
        })
    }
}
