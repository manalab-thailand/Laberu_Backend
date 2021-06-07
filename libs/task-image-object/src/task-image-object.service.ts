import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskImageObject } from './dto/create-task-image-object.dto';
import { FindTaskImageObjectResidualWork } from './dto/find-task-image-residual.dto';
import { QueryImageObject } from './dto/query-image.dto';
import { ResetStatusTaskImageObject } from './dto/reset-status-task-object.dto';
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

    async findCountTaskImageObject(): Promise<any> {
        return await this.taskIamgeObjectModel.count({ process: true }).exec()
    }

    async queryImageObject(payload: QueryImageObject): Promise<TaskImageObject> {
        const { user_id } = payload;
        return await this.taskIamgeObjectModel.aggregate([
            { $match: { status: false, process: false } },
            {
                $lookup: {
                    from: "task_success",
                    localField: "shortcode",
                    foreignField: "shortcode",
                    as: "TaskSuccess"
                }
            },
            { $match: { "TaskSuccess.user_id": { $ne: user_id } } },
            { $limit: 1 }
        ]).exec();
    }

    async updateStatus(payload: UpdateStatusImageOjbect): Promise<any> {
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

    async updateProcess(payload: UpdateProcessImageOjbect): Promise<any> {
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

    async findTaskImageObjectResidualWork(payload: FindTaskImageObjectResidualWork): Promise<any> {
        const { process, status } = payload;

        return await this.taskIamgeObjectModel.find({ status: status, process: process }).exec()

        // TaskImage.forEach(doc => {
        //     const millis = Date.now() - Number(doc.time_start);
        //     const second = Math.floor(millis / 1000);
        //     if (second >= 3600) {
        //         this.taskIamgeObjectModel.updateOne(
        //             { _id: doc._id },
        //             {
        //                 status,
        //                 process,
        //                 time_start
        //             },
        //             { upsert: false },
        //         ).exec();
        //     }
        // })
    }

}
