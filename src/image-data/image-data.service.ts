import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateImageDatumDto } from './dto/create-image-datum.dto';
import { UpdateImageDatumDto } from './dto/update-image-datum.dto';
import { ImageDataDocument, ImageDatum } from './entities/image-datum.entity';

@Injectable()
export class ImageDataService {

  constructor(@InjectModel(ImageDatum.name) private imageDataModel: Model<ImageDataDocument>) { }

  async create(createImageDatumDto: CreateImageDatumDto) {
    const createImage = new this.imageDataModel(createImageDatumDto);
    return await createImage.save();
  }

  async findAll() {
    return await this.imageDataModel.find({}).exec();
  }

  async findByShortcode(shortcode: String) {
    return await this.imageDataModel.find({ shortcode: shortcode }).exec();
  }

  async getCountImageData() {
    return await this.imageDataModel.count({}).exec();
  }

  async removeAll(){
    return await this.imageDataModel.deleteMany().exec();
  }
}
