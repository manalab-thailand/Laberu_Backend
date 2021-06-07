import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createImageData } from './dto/create.dto';
import { FindOneByShortcode } from './dto/find-one-by-shortcode.dto';
import { ImageData, ImageDataDocument } from './entity/image-datum.entity';
import { IImageDataService } from './image-data-interface.service';

@Injectable()
export class ImageDataService implements IImageDataService {

    constructor(
        @InjectModel(ImageData.name)
        private readonly ImageDataModel: Model<ImageDataDocument>
    ) { }

    async createImageData(payload: createImageData): Promise<any> {
        const createImageData = new this.ImageDataModel(payload);
        await createImageData.save();
    }

    async findOneByShortcode(payload: FindOneByShortcode): Promise<ImageData> {
        return await this.ImageDataModel.findOne({ shortcode: payload.shortcode });
    }


}
