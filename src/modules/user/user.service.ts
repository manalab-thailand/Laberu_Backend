import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckUserActive } from './dto/check-user.dto';
import { CreateUser } from './dto/create.dto';
import { FindOneUserByUID } from './dto/find-one.dto';
import { User, UserDocument } from './entity/user-entity';
import { IUserService } from './interface/user-interface.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(payload: CreateUser): Promise<any> {
    const createUser = new this.userModel(payload);
    await createUser.save();
  }

  async checkUserActive(payload: CheckUserActive): Promise<User> {
    const { uid } = payload;
    return await this.userModel.findOne({ uid }).exec();
  }

  async getUser() {
    return await this.userModel.find().exec();
  }

  async findTaskSuccessByUser(project_id: string, type: string) {
    let collectionTarget = '';

    if (type == 'labelling') {
      collectionTarget = 'task_success_object';
    } else if (type == 'annotation') {
      collectionTarget = 'task_success_annotation';
    }

    return await this.userModel.aggregate([
      {
        $project: {
          _id: {
            $toString: '$_id',
          },
          firstname: 1,
          lastname: 1,
          email: 1,
        },
      },
      {
        $lookup: {
          from: collectionTarget,
          localField: '_id',
          foreignField: 'user_id',
          as: 'tasksuccess',
        },
      },
      {
        $match: {
          tasksuccess: {
            $gt: [
              {
                $size: '$tasksuccess',
              },
              0,
            ],
            $elemMatch: {
              project_id: project_id,
              payment: null,
              paymentAt: null,
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          firstname: 1,
          lastname: 1,
          email: 1,
          total: {
            $size: '$tasksuccess',
          },
        },
      },
    ]);
  }
}
