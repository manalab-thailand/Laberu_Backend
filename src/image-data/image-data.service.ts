import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateImageDataDto } from './dto/create-image-data.dto';
import { ImageData, ImageDataDocument } from './entities/image-data.schema';

@Injectable()
export class ImageDataService {
  constructor(
    @InjectModel(ImageData.name)
    private readonly imageDataModel: Model<ImageDataDocument>,
  ) {}

  async create(payload: CreateImageDataDto): Promise<ImageData> {
    const createdImageData = new this.imageDataModel({
      ...payload,
      createAt: new Date(),
    });
    return createdImageData.save();
  }
}
