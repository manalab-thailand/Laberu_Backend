import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createImageData } from './dto/create.dto';
import { FindCountByProjectId } from './dto/find-count-by-project-id.dto';
import { FindOneByShortcode } from './dto/find-one-by-shortcode.dto';
import { ImageData, ImageDataDocument } from './entity/image-datum.entity';
import { IImagedataService } from './interface/imagedata-interface.service';

@Injectable()
export class ImagedataService implements IImagedataService {

  constructor(
    @InjectModel(ImageData.name)
    private readonly ImageDataModel: Model<ImageDataDocument>
  ) { }

  async createImageData(payload: createImageData): Promise<any> {
    const createImageData = new this.ImageDataModel(payload);
    await createImageData.save();
  }

  async insertMany(payload: { mapdata }): Promise<any> {
    const { mapdata } = payload
    return await this.ImageDataModel.insertMany(mapdata);
  }

  async findAll(): Promise<any> {
    return await this.ImageDataModel.find({}).limit(10).exec();
  }

  async findOneByShortcode(payload: FindOneByShortcode): Promise<ImageData> {
    const { shortcode, project_id } = payload
    return await this.ImageDataModel.findOne({ shortcode, project_id }).exec();
  }

  async findAllByProjectId(payload: FindCountByProjectId): Promise<any> {
    const { project_id } = payload
    return await this.ImageDataModel.find({ project_id }).exec();
  }

  async findCountByProjectId(payload: FindCountByProjectId): Promise<any> {
    const { project_id } = payload;
    return await this.ImageDataModel.countDocuments({ project_id }).exec();
  }

}
