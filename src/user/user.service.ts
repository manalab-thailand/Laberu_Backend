import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto)
    return await createdUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async test(fname: String, lname: String) {
    return await this.userModel.find({ fname: fname, lname: lname }).exec();
  }

  async checkUserLogin(uid: String) {
    return await this.userModel.find({ uid: uid }).exec();
  }

  async remove(_id: String) {
    return await this.userModel.remove({ _id: _id }).exec();
  }
}
