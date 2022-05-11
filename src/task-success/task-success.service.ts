import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query } from 'mongoose';
import { Project, ProjectDocument } from 'src/project/entities/project.schema';
import { CreateTaskSuccessDto } from './dto/create-task-success.dto';
import { ExportTaskSuccessByProject } from './dto/export-task-success-by-project.dto';
import { FindByProjectId } from './dto/find-by-project.dto';
import { FindByUserId } from './dto/find-by-user.dto';
import { GetReportUser } from './dto/get-report-user';
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

  async findCountTaskSuccessByProject(
    payload: FindByProjectId,
  ): Promise<Number> {
    const { project_id, ...query } = payload;
    const count = await this.taskSuccessModel
      .aggregate([
        {
          $match: {
            project_id: project_id,
          },
        },
        {
          $addFields: {
            userId: {
              $toObjectId: '$user_id',
            },
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
          },
        },
        {
          $match: query,
        },
        {
          $group: {
            _id: null,
            count: {
              $sum: 1,
            },
          },
        },
      ])
      .allowDiskUse(true)
      .exec();

    return count[0].count;
  }

  async findTaskSuccessByProject(
    payload: FindByProjectId,
  ): Promise<TaskSuccess[]> {
    const { project_id, limit, skip, ...query } = payload;
    return await this.taskSuccessModel
      .aggregate([
        {
          $match: {
            project_id: project_id,
          },
        },
        {
          $addFields: {
            userId: {
              $toObjectId: '$user_id',
            },
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
          },
        },
        {
          $match: query,
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $skip: skip ? Number(skip) : 0,
        },
        {
          $limit: limit ? Number(limit) : 10,
        },
      ])
      .allowDiskUse(true)
      .exec();
  }

  async findTaskSuccessByUser(payload: FindByUserId): Promise<TaskSuccess[]> {
    const { user_id } = payload;
    return await this.taskSuccessModel.aggregate([
      {
        $match: {
          user_id: user_id,
        },
      },
      {
        $group: {
          _id: {
            $toObjectId: '$project_id',
          },
          total: {
            $sum: 1,
          },
          total_price: {
            $sum: '$price',
          },
          paid: {
            $sum: {
              $cond: [
                {
                  $eq: ['$payment_status', 'success'],
                },
                '$price',
                0,
              ],
            },
          },
          pending: {
            $sum: {
              $cond: [
                {
                  $ne: ['$payment_status', 'success'],
                },
                '$price',
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: 'project',
          localField: '_id',
          foreignField: '_id',
          as: 'project',
        },
      },
      {
        $unwind: {
          path: '$project',
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          total_price: 1,
          paid: 1,
          pending: 1,
          project_name: '$project.project_name',
          label_type: '$project.label_type',
        },
      },
    ]);
  }

  async findHistory(query: FilterQuery<TaskSuccessDocument>) {
    return await this.taskSuccessModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(5)
      .exec();
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

  async updateAcceptStatusProject(payload: UpdateAcceptStatusProject) {
    const { accept, project_id, update_by } = payload;
    return await this.taskSuccessModel
      .updateMany(
        { project_id },
        { accept, update_by, updatedAt: new Date() },
        { upsert: false },
      )
      .exec();
  }

  async updatePaymentStatusDoing(payload: UpdatePaymentStatusDoing) {
    const { project_id, update_by } = payload;
    return await this.taskSuccessModel
      .updateMany(
        {
          project_id,
          payment_status: PaymentStatus.WAITING,
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

  async updatePaymentStatusSuccess(payload: UpdatePaymentStatusSuccess) {
    const { project_id, update_by } = payload;
    return await this.taskSuccessModel
      .updateMany(
        { project_id, payment_status: PaymentStatus.DOING },
        {
          payment_status: PaymentStatus.SUCCUSS,
          paymentAt: new Date(),
          updatedAt: new Date(),
          update_by,
        },
        { upsert: false },
      )
      .exec();
  }

  async getCountReportUser(payload: GetReportUser) {
    const { limit, skip, project_id, ...query } = payload;

    const count = await this.taskSuccessModel.aggregate([
      {
        $match: {
          project_id: project_id,
        },
      },
      {
        $group: {
          _id: {
            $toObjectId: '$user_id',
          },
        },
      },
      {
        $lookup: {
          from: 'user',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
        },
      },
      {
        $match: query,
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    return (count as any)[0].count;
  }

  async getReportUser(payload: GetReportUser) {
    const { limit, skip, project_id, ...query } = payload;
    return await this.taskSuccessModel.aggregate([
      [
        {
          $match: {
            project_id: payload.project_id,
          },
        },
        {
          $group: {
            _id: {
              $toObjectId: '$user_id',
            },
            price: {
              $sum: {
                $cond: [
                  {
                    $eq: ['$payment_status', 'waiting'],
                  },
                  '$price',
                  0,
                ],
              },
            },
            total: {
              $sum: 1,
            },
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: '_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
          },
        },
        {
          $sort: {
            'user.createdAt': 1,
          },
        },
        {
          $match: query,
        },
        {
          $skip: payload.skip ? Number(payload.skip) : 0,
        },
        {
          $limit: payload.limit ? Number(payload.limit) : 10,
        },
        {
          $project: {
            _id: 0,
            price: 1,
            total: '$total',
            firstname: '$user.firstname',
            lastname: '$user.lastname',
            email: '$user.email',
            bank_name: '$user.payment.bank_name',
            bank_account_no: '$user.payment.bank_account_no',
            bank_account_name: '$user.payment.bank_account_name',
          },
        },
      ],
    ]);
  }

  async getCountReportPrice(payload: { project_id: string }) {
    return await this.taskSuccessModel
      .aggregate([
        {
          $match: {
            project_id: payload.project_id,
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: 1,
            },
            total_price: {
              $sum: '$price',
            },
            paid: {
              $sum: {
                $cond: [
                  {
                    $eq: ['$payment_status', 'success'],
                  },
                  '$price',
                  0,
                ],
              },
            },
            pending: {
              $sum: {
                $cond: [
                  {
                    $ne: ['$payment_status', 'success'],
                  },
                  '$price',
                  0,
                ],
              },
            },
          },
        },
      ])
      .exec();
  }

  async exportTaskSuccessByProject(
    payload: ExportTaskSuccessByProject,
  ): Promise<TaskSuccess[]> {
    const { project_id } = payload;
    return await this.taskSuccessModel.aggregate([
      {
        $match: {
          project_id,
          payment_status: PaymentStatus.DOING,
        },
      },
      {
        $group: {
          _id: {
            $toObjectId: '$user_id',
          },
          price: {
            $sum: '$price',
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: 'user',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
        },
      },
      {
        $project: {
          _id: 0,
          price: {
            $round: ['$price', 2],
          },
          count: 1,
          firstname: '$user.firstname',
          lastname: '$user.lastname',
          email: '$user.email',
          bank_name: '$user.payment.bank_name',
          bank_account_no: '$user.payment.bank_account_no',
          bank_account_name: '$user.payment.bank_account_name',
        },
      },
    ]);
  }
}
