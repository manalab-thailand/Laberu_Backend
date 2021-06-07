import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckUserActive } from './dto/check-user.dto';
import { CreateUser } from './dto/create.dto';
import { User, UserDocument } from './entity/user-entity';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>
    ) { }

    async createUser(payload: CreateUser): Promise<any> {
        const createUser = new this.userModel(payload);
        await createUser.save();
    }

    async checkUserActive(payload: CheckUserActive): Promise<User> {
        const { uid } = payload
        return await this.userModel.findOne({ uid }).exec();
    }

}
