import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.schema';
import { UserStatus } from './interface/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(payload: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
      update_by: '',
    });
    return await createdUser.save();
  }

  async createCustomer(payload: CreateCustomerDto): Promise<User> {
    const createdCustomer = new this.userModel({
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
      update_by: '',
    });
    return await createdCustomer.save();
  }

  async checkUserActive(uid: string): Promise<User> {
    return await this.userModel
      .findOne({ uid, status: UserStatus.ACTIVE })
      .exec();
  }

  async findOneUser(payload: FindOneUserDto): Promise<User> {
    const { user_id } = payload;
    return await this.userModel.findById(user_id).exec();
  }

  async findAllUser(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async updateUser(payload: UpdateUserDto): Promise<User> {
    const { _id, ...data } = payload;
    return await this.userModel
      .findByIdAndUpdate(
        _id,
        { ...data, updatedAt: new Date() },
        { upsert: false, useFindAndModify: false },
      )
      .exec();
  }
}
