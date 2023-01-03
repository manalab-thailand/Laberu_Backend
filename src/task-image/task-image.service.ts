import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskImageManyDto } from './dto/create-task-image-many.dto';
import { GetTaskImageByShortcode } from './dto/get-task-image-by-shortcode.dto';
import { GetTaskImageDto } from './dto/get-task-image.dto';
import { UpdateStatusTaskImageDto } from './dto/update-status-task-image.dto';
import { TaskImage, TaskImageDocument } from './entities/task-image.schema';
import { TaskImageProcess, TaskImageStatus } from './interface/task-image.enum';
import { Project, ProjectDocument } from 'src/project/entities/project.schema';
import { ProjectProcess } from 'src/project/interface/project.enum';

@Injectable()
export class TaskImageService {
  constructor(
    @InjectModel(TaskImage.name)
    private readonly taskImageModel: Model<TaskImageDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async createTaskImageMany(
    payload: CreateTaskImageManyDto,
  ): Promise<TaskImage[]> {
    const { mapTaskSuccess } = payload;
    return await this.taskImageModel.insertMany(mapTaskSuccess);
  }

  async getCountTaskImageByProjectId(payload: { project_id: string }) {
    const total = await this.taskImageModel
      .countDocuments({
        project_id: payload.project_id,
      })
      .exec();
    const success = await this.taskImageModel
      .countDocuments({
        project_id: payload.project_id,
        process: TaskImageProcess.SUCCESS,
      })
      .exec();
    return {
      total,
      success,
    };
  }

  async getTaskImage(payload: GetTaskImageDto): Promise<TaskImage> {
    const { project_id, user_id } = payload;

    const project = await this.projectModel
      .findOne({ _id: payload.project_id })
      .exec();

    if (project && project.process === ProjectProcess.SUCCESS) {
      return null;
    }

    const taskImage = await this.taskImageModel
      .aggregate([
        {
          $match: {
            status: 'waiting',
            process: 'doing',
            project_id: project_id,
          },
        },
        { $limit: 200 },
        {
          $lookup: {
            from: 'task_success',
            let: {
              shortcode: '$shortcode',
              project_id: '$project_id',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$shortcode', '$$shortcode'] },
                      { $eq: ['$project_id', '$$project_id'] },
                    ],
                  },
                },
              },
            ],
            as: 'task_success',
          },
        },
        {
          $match: {
            'task_success.user_id': { $ne: user_id },
            'task_success.accept': { $ne: true },
          },
        },
        { $limit: 1 },
      ])
      .exec();

    console.log(taskImage);

    if (!taskImage.length) {
      await this.getTaskImage({ project_id, user_id });
    } else {
      return taskImage;
    }
  }

  async getTaskImageByShortcode(
    payload: GetTaskImageByShortcode,
  ): Promise<TaskImage> {
    const { project_id, shortcode } = payload;
    return await this.taskImageModel.findOne({ project_id, shortcode }).exec();
  }

  async updateStatusTaskImage(
    payload: UpdateStatusTaskImageDto,
  ): Promise<TaskImage> {
    const { status, task_id } = payload;

    const data = { status, doingAt: new Date() };

    return await this.taskImageModel
      .findByIdAndUpdate(task_id, data, {
        upsert: false,
        useFindAndModify: false,
      })
      .exec();
  }

  async updateProcessTaskImage(task_id: string): Promise<TaskImage> {
    return await this.taskImageModel.findByIdAndUpdate(
      task_id,
      {
        doneAt: new Date(),
        process: TaskImageProcess.SUCCESS,
        status: TaskImageStatus.SUCCESS,
      },
      { upsert: false, useFindAndModify: false },
    );
  }
}
