import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageData, ImageDataSchema } from './entity/image-datum.entity';
import { ImageDataService } from './image-data.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ImageData.name, schema: ImageDataSchema }])],
  providers: [ImageDataService],
  exports: [ImageDataService],
})
export class ImageDataModule { }
