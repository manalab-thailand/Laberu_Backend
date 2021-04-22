import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { CreateTaskImageDto } from './dto/create-task-image.dto';
import { UpdateTaskImageDto } from './dto/update-task-image.dto';
import { TaskImage, TaskImageDocument } from './entities/task-image.entity';

@Injectable()
export class TaskImageService {

  constructor(@InjectModel(TaskImage.name) private taskImageModel: Model<TaskImageDocument>) { }

  async create(createTaskImageDto: CreateTaskImageDto) {
    const createdTaskImage = new this.taskImageModel(createTaskImageDto)
    return await createdTaskImage.save();
  }

  async findAll() {
    return await this.taskImageModel.find().exec();
  }

  async getCountTaskSuccess() {
    return await this.taskImageModel.count({ process: true }).exec();
  }

  async findNextImage(user_id: String) {
    return await this.taskImageModel.aggregate([
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

  async fineTaskSuccessWithId(_id: String) {
    return await this.taskImageModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(`${_id}`) } },
      {
        $lookup: {
          from: "task_success",
          localField: "shortcode",
          foreignField: "shortcode",
          as: "TaskSuccess"
        }
      },
    ]).exec();
  }

  async findTaskSuccessInAnImages() {
    return await this.taskImageModel.aggregate([
      {
        $lookup: {
          from: "task_success",
          localField: "shortcode",
          foreignField: "shortcode",
          as: "result"
        }
      },
      {
        $project: {
          "shortcode": 1,
          "result.description": 1,
        }
      },
      {
        $match: {
          $expr: { $gt: [{ $size: "$result" }, 0] }
        }
      }
    ]).exec();
  }

  async randomTaskSuccessInAnImages() {
    return await this.taskImageModel.aggregate([
      {
        $lookup: {
          from: "task_success",
          localField: "shortcode",
          foreignField: "shortcode",
          as: "result"
        }
      },
      {
        $project: {
          "shortcode": 1,
          "result.description": 1,
        }
      },
      {
        $match: {
          $expr: { $gt: [{ $size: "$result" }, 0] }
        }
      },
      { $sample: { size: 1 } }
    ]).exec();
  }

  async updateStatus(_id: String, updateTaskImageDto: UpdateTaskImageDto) {
    await this.taskImageModel.updateOne(
      { _id: _id },
      {
        time_start: updateTaskImageDto.time_start,
        status: updateTaskImageDto.status,
      },
      { upsert: false }
    ).exec()
  }

  async updateProcess(_id: String, updateTaskImageDto: UpdateTaskImageDto) {
    await this.taskImageModel.updateOne(
      { _id: _id },
      {
        time_start: updateTaskImageDto.time_start,
        status: updateTaskImageDto.status,
        process: updateTaskImageDto.process,
      },
      { upsert: false }
    ).exec()
  }

  async updateStatusAll(updateTaskImageDto: UpdateTaskImageDto) {
    await this.taskImageModel.updateMany(
      {
        time_start: updateTaskImageDto.time_start,
        status: updateTaskImageDto.status,
        process: updateTaskImageDto.process
      }
    ).exec()
  }

  async resetStatusTask(updateTaskImageDto: UpdateTaskImageDto) {
    (await this.taskImageModel.find({ status: true, process: false })).forEach(doc => {

      const millis = Date.now() - Number(doc.time_start);
      const second = Math.floor(millis / 1000);

      if (second >= 3600) {

        this.taskImageModel.updateOne(
          { _id: doc._id },
          {
            status: updateTaskImageDto.status,
            process: updateTaskImageDto.process,
            time_start: updateTaskImageDto.time_start,
          },
          { upsert: false },
        ).exec();

      }
    })
  }

  async remove(_id: String) {
    return await this.taskImageModel.remove({ _id: _id }).exec();
  }

  async removeAll() {
    return await this.taskImageModel.deleteMany().exec();
  }
}
