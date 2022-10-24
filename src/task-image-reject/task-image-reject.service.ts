import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  TaskSuccess,
  TaskSuccessDocument,
} from 'src/task-success/entities/task-success.schema';
import { User, UserDocument } from 'src/user/entities/user.schema';
import {
  TaskImageReject,
  TaskImageRejectDocument,
} from './entities/task-image-reject.schema';
import {
  IApproveRequest,
  ICreateRequest,
  IGetAllRequest,
  IRejectRequest,
  IUpdateRequest,
} from './interface/task-image-reject';

@Injectable()
export class TaskImageRejectService {
  constructor(
    @InjectModel(TaskImageReject.name)
    private readonly taskImageReject: Model<TaskImageRejectDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(TaskSuccess.name)
    private readonly taskSuccessModel: Model<TaskSuccessDocument>,
  ) {}

  query(payload: IGetAllRequest) {
    const query = [] as any;
    let sort = {} as any;
    const match = {} as any;

    if (payload.project_id) {
      match.project_id = Types.ObjectId(payload.project_id);
    }

    if (payload.user_id) {
      match.user_id = Types.ObjectId(payload.user_id);
    }

    if (payload.shortcode) {
      match.shortcode = { $regex: payload.shortcode, $options: 'i' };
    }

    if (payload.status) {
      match.status = payload.status;
    }

    query.push({ $match: match });

    if (payload.sort) {
      const splitSort = payload.sort.split(':');
      sort = {
        [splitSort[0]]: splitSort[1].toLocaleLowerCase() === 'desc' ? -1 : 1,
      };
    } else {
      sort = {
        createdAt: -1,
      };
    }

    query.push({
      $sort: sort,
    });

    return query;
  }

  async getListReject(payload: IGetAllRequest) {
    const query = this.query(payload);

    const total =
      (
        await this.taskImageReject
          .aggregate([
            ...query,
            {
              $count: 'total',
            },
          ])
          .exec()
      )[0]?.total ?? 0;

    if (payload.page) {
      query.push({
        $skip: payload.page ? (payload.page - 1) * payload.limit : 0,
      });
    }

    if (payload.limit) {
      query.push({
        $limit: payload.limit ? Number(payload.limit) : 10,
      });
    }

    query.push({
      $lookup: {
        from: 'task_success',
        localField: 'task_success_id',
        foreignField: '_id',
        as: 'task_success',
      },
    });

    query.push({
      $lookup: {
        from: 'project',
        localField: 'project_id',
        foreignField: '_id',
        as: 'project',
      },
    });

    query.push({
      $unwind: {
        path: '$task_success',
      },
    });

    query.push({
      $unwind: {
        path: '$project',
      },
    });

    const data = await this.taskImageReject.aggregate(query).exec();

    return {
      pagination: {
        page: payload.page ? Number(payload.page) : 1,
        page_size: Number(payload.limit ?? 10),
        page_count: Math.ceil(total / Number(payload.limit ?? 10)),
        total: total,
      },
      entities: data,
    };
  }

  async create(payload: ICreateRequest) {
    const taskSuccess = await this.taskSuccessModel.findById(
      payload.task_success_id,
    );
    const user = await this.userModel.findById(payload.user_id);
    const createdTaskImageReject = new this.taskImageReject({
      shortcode: taskSuccess.shortcode,
      status: 'waiting',
      new_result: null,
      user_id: Types.ObjectId(payload.user_id),
      task_success_id: Types.ObjectId(payload.task_success_id),
      project_id: Types.ObjectId(taskSuccess.project_id),
      approve_by: null,
      reject_by: user,
      approvedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await createdTaskImageReject.save();

    // const taskSuccess = await this.taskSuccessModel.find({
    //   accept: false,
    // });

    // const data = taskSuccess.map((x) => ({
    //   shortcode: x.shortcode,
    //   status: 'waiting',
    //   new_result: null,
    //   user_id: Types.ObjectId(x.user_id),
    //   task_success_id: Types.ObjectId(x._id),
    //   project_id: Types.ObjectId(x.project_id),
    //   approve_by: null,
    //   reject_by: null,
    //   approvedAt: null,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }));

    // return await this.taskImageReject.insertMany(data);
  }

  async update(payload: IUpdateRequest) {
    return await this.taskImageReject.findByIdAndUpdate(
      payload.id,
      {
        new_result: payload.new_result,
        status: 'review',
        updatedAt: new Date(),
      },
      { upsert: false, useFindAndModify: true },
    );
  }

  async reject(payload: IRejectRequest) {
    const user = await this.userModel.findById(payload.user_id);
    return await this.taskImageReject.findByIdAndUpdate(
      payload.id,
      { status: 'reject', updatedAt: new Date(), reject_by: user },
      { upsert: false, useFindAndModify: true },
    );
  }

  async approve(payload: IApproveRequest) {
    const taskImageReject = await this.taskImageReject.findById(payload.id);

    const user = await this.userModel.findById(payload.user_id);

    await this.taskSuccessModel.findByIdAndUpdate(
      taskImageReject.task_success_id,
      {
        result: {
          annotation: {
            description: taskImageReject.new_result,
          },
        },
        accept: true,
        updatedAt: new Date(),
      },
      { upsert: false, useFindAndModify: true },
    );

    return await this.taskImageReject.findByIdAndUpdate(
      payload.id,
      {
        status: 'approved',
        approve_by: user,
        approvedAt: new Date(),
        updatedAt: new Date(),
      },
      { upsert: false, useFindAndModify: true },
    );
  }
}
