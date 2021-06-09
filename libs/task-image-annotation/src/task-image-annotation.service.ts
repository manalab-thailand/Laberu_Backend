import { UpdateProcessImageOjbect } from '@laberu/task-image-object/dto/update-process.dto';
import { UpdateStatusImageOjbect } from '@laberu/task-image-object/dto/update-status.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindCountTaskImage } from 'src/modules/taskimage/dto/find-count.dto';
import { CreateTaskImageAnnotation } from './dto/create-task-image-object.dto';
import { QueryImageAnnotation } from './dto/query-image.dto';
import { UpdateProcessImageAnnotation } from './dto/update-process.dto';
import { UpdateStatusImageAnnotation } from './dto/update-status.dto';
import { TaskImageAnnotation, TaskImageAnnotationDocument } from './entity/task-image.entity';
import { ITaskImageAnnotationService } from './task-image-annotation-interface.service';

@Injectable()
export class TaskImageAnnotationService implements ITaskImageAnnotationService {
    constructor(
        @InjectModel(TaskImageAnnotation.name)
        private readonly taskIamgeAnnotationModel: Model<TaskImageAnnotationDocument>
    ) { }

    async createTaskImageAnnotation(payload: CreateTaskImageAnnotation): Promise<any> {
        const createTaskImageAnnotation = new this.taskIamgeAnnotationModel(payload);
        await createTaskImageAnnotation.save();
    }

    async findCountTaskImageAnnotation(payload: FindCountTaskImage): Promise<any> {
        const { project_id } = payload
        return await this.taskIamgeAnnotationModel.countDocuments({ process: true, project_id, }).exec()
    }

    async queryImageAnnotation(payload: QueryImageAnnotation): Promise<any> {
        const { user_id, project_id } = payload;
        return await this.taskIamgeAnnotationModel.aggregate([
            { $match: { status: false, process: false, project_id: project_id } },
            {
                $lookup: {
                    from: "task_success_annotation",
                    localField: "shortcode",
                    foreignField: "shortcode",
                    as: "TaskSuccess"
                }
            },
            { $match: { "TaskSuccess.user_id": { $ne: user_id } } },
            { $limit: 1 }
        ]).exec();
    }

    async updateStatusAnnotation(payload: UpdateStatusImageAnnotation): Promise<any> {
        const { id, status, time_start } = payload
        await this.taskIamgeAnnotationModel.updateOne(
            { _id: id },
            {
                time_start,
                status,
            },
            { upsert: true },
        )
    }

    async updateProcessAnnotation(payload: UpdateProcessImageAnnotation): Promise<any> {
        const { id, status, process, time_start } = payload
        await this.taskIamgeAnnotationModel.updateOne(
            { _id: id },
            {
                time_start,
                status,
                process,
            },
            { upsert: true },
        )
    }

    async findTaskImageAnnotationResidualWork(): Promise<any> {
        const taskImageResidualWork = await this.taskIamgeAnnotationModel.find({ status: true, process: false }).exec()
        return taskImageResidualWork.forEach(doc => {
            const millis = Date.now() - Number(doc.time_start);
            const second = Math.floor(millis / 1000);
            if (second >= 5400) {
                this.taskIamgeAnnotationModel.updateOne(
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
