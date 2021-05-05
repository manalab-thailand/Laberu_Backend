import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Schema } from 'mongoose';
import { CreateTesterDto } from './dto/create-tester.dto';
import { Tester, TesterDocument } from './entities/tester.entity';

@Injectable()
export class TesterService {
  constructor(@InjectModel(Tester.name) private testerModel: Model<TesterDocument>) { }

  create(createTesterDto: CreateTesterDto) {
    return 'This action adds a new tester';
  }

  async findAll() {
    return await this.testerModel.find().exec();
  }
}
