import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/project/entities/project.schema';
import { CreateTaskSuccessDto } from './dto/create-task-success.dto';
import { ExportTaskSuccessByProject } from './dto/export-task-success-by-project.dto';
import { FindByProjectId } from './dto/find-by-project.dto';
import { FindByUserId } from './dto/find-by-user.dto';
import { UpdateAcceptStatusProject } from './dto/update-accept-status-project.dto';
import { UpdateAcceptStatus } from './dto/update-accept-status.dto';
import { UpdatePaymentStatusDoing } from './dto/update-payment-status-doing.dto';
import { UpdatePaymentStatusSuccess } from './dto/update-payment-status-success.dto';
import {
  TaskSuccess,
  TaskSuccessDocument,
} from './entities/task-success.schema';
import { PaymentStatus } from './interface/task-success.enum';

@Injectable()
export class TaskSuccessService {
  constructor(
    @InjectModel(TaskSuccess.name)
    private readonly taskSuccessModel: Model<TaskSuccessDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async createTaskSuccess(payload: CreateTaskSuccessDto): Promise<TaskSuccess> {
    const _project = await this.projectModel.findOne({
      _id: payload.project_id,
    });

    const createdTaskSuccess = new this.taskSuccessModel({
      ...payload,
      accept: true,
      price: _project.price_image,
      payment_status: PaymentStatus.WAITING,
      paymentAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      update_by: '',
    });
    return await createdTaskSuccess.save();
  }

  async findTaskSuccessByProject(
    payload: FindByProjectId,
  ): Promise<TaskSuccess[]> {
    const { project_id } = payload;
    return await this.taskSuccessModel.find({ project_id }).exec();
  }

  async findTaskSuccessByUser(payload: FindByUserId): Promise<TaskSuccess[]> {
    const { user_id } = payload;
    return await this.taskSuccessModel.aggregate([
      {
        $match: {
          user_id,
        },
      },
      {
        $group: {
          _id: '$project_id',
          total: {
            $sum: '$price',
          },
        },
      },
      {
        $project: {
          _id: 0,
          project_id: {
            $toObjectId: '$_id',
          },
          total: 1,
        },
      },
      {
        $lookup: {
          from: 'project',
          localField: 'project_id',
          foreignField: '_id',
          as: 'project',
        },
      },
      {
        $unwind: {
          path: '$project',
        },
      },
    ]);
  }

  async findCountTaskSuccessByTaskId(task_id: string): Promise<Number> {
    return await this.taskSuccessModel.countDocuments({
      task_id,
    });
  }

  async updateAcceptStatus(payload: UpdateAcceptStatus): Promise<TaskSuccess> {
    const { accept, task_success_id, update_by } = payload;
    return await this.taskSuccessModel
      .findByIdAndUpdate(
        task_success_id,
        { accept, update_by, updatedAt: new Date() },
        { upsert: false, useFindAndModify: false },
      )
      .exec();
  }

  async updateAcceptStatusProject(
    payload: UpdateAcceptStatusProject,
  ): Promise<TaskSuccess[]> {
    const { accept, project_id, update_by } = payload;
    return await this.taskSuccessModel
      .updateMany(
        { project_id },
        { accept, update_by, updatedAt: new Date() },
        { upsert: false },
      )
      .exec();
  }

  async updatePaymentStatusDoing(
    payload: UpdatePaymentStatusDoing,
  ): Promise<TaskSuccess[]> {
    const { project_id, update_by, array_id } = payload;
    return await this.taskSuccessModel
      .updateMany(
        {
          project_id,
          payment_status: PaymentStatus.WAITING,
          _id: { $in: array_id },
        },
        {
          payment_status: PaymentStatus.DOING,
          update_by,
          updatedAt: new Date(),
        },
        { upsert: false },
      )
      .exec();
  }

  async updatePaymentStatusSuccess(
    payload: UpdatePaymentStatusSuccess,
  ): Promise<TaskSuccess[]> {
    const { project_id, update_by } = payload;
    return await this.taskSuccessModel
      .updateMany(
        { project_id, payment_status: PaymentStatus.DOING },
        {
          payment_status: PaymentStatus.SUCCUSS,
          paymentAt: new Date(),
          update_by,
          updatedAt: new Date(),
        },
        { upsert: false },
      )
      .exec();
  }

  async exportTaskSuccessByProject(
    payload: ExportTaskSuccessByProject,
  ): Promise<TaskSuccess[]> {
    const { project_id } = payload;
    return await this.taskSuccessModel
      .find({ project_id, accept: true })
      .exec();
  }
}
